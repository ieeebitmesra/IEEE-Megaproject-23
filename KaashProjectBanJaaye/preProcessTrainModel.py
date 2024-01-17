import string
from random import random
import cv2
import numpy as np
from keras.src.utils import pad_sequences
from keras.layers import Dense, LSTM,  BatchNormalization, Input, Conv2D, MaxPool2D, Lambda, Bidirectional
from keras.models import Model
import keras.backend as K
from keras.callbacks import ModelCheckpoint

recognizableChar = string.digits + string.ascii_letters + string.punctuation #all recognizable char for data encoding
size = (32, 128)


def encodeText(txt):
    digitList = []
    for char in txt:
        try:
            digitList.append(recognizableChar.index(char))
        except:
            print(char)

    return digitList


def sharpenImage(im):  # Need to check if sharpening input images would help accuracy
    kernel = np.ones((4, 2), np.float32) / 90  # (3,3) felt meh...
    im = cv2.filter2D(im, -1, kernel)  # -1 means depth of image remains unchanged
    im = cv2.adaptiveThreshold(im, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 1)
    im = 255 - im
    # cv2.imwrite("DATA/sharpend1.jpeg",im)
    return im


def reshapeForNN(img, size):
    (H, W) = size
    (h, w) = img.shape
    R = min(W / w, H / h)
    img = cv2.resize(img, (int(w * R), int(h * R)), interpolation=cv2.INTER_CUBIC)
    canvas = np.zeros(size)
    npImg = np.asarray(img)
    for j in range(0, int(w * R) - 1):
        for i in range(0, int(h * R) - 1):
            canvas[i][j] = max(canvas[i][j], npImg[i][j])  #padding the image to the size of input layer of nn
    cv2.imwrite("DATA/Test.jpeg", canvas)
    return canvas


# lists for training dataset
training_img = []
training_txt = []
train_input_length = []
train_label_length = []
orig_txt = []

# lists for validation dataset
valid_img = []
valid_txt = []
valid_input_length = []
valid_label_length = []
valid_orig_txt = []

max_label_len = 0

annot = open('F:/OCR/Data-generator-for-CRNN/annotation.txt', 'r').readlines()
imagenames = []
txts = []

for cnt in annot:
    filename, txt = cnt.split(',')[0], cnt.split(',')[1].split('\n')[0] #saving filenames and text
    imagenames.append(filename)
    txts.append(txt)

c = list(zip(imagenames, txts))

random.shuffle(c)

imagenames, txts = zip(*c)

for i in range(len(imagenames)):
    img = cv2.imread('/content/Data-generator-for-CRNN/images/' + imagenames[i], 0)

    img = sharpenImage(img)
    img = reshapeForNN(img, size)
    img = np.expand_dims(img, axis=-1)
    img = img / 255.
    txt = txts[i]

    #maximum length of the text
    if len(txt) > max_label_len:
        max_label_len = len(txt)

    # splitting the data into validation and training dataset as 10% and 90% respectively
    if i % 10 == 0:
        valid_orig_txt.append(txt)
        valid_label_length.append(len(txt))
        valid_input_length.append(31)
        valid_img.append(img)
        valid_txt.append(encodeText(txt))
    else:
        orig_txt.append(txt)
        train_label_length.append(len(txt))
        train_input_length.append(31)
        training_img.append(img)
        training_txt.append(encodeText(txt))

# wordNow --> wordNow00000 post padding ans with len of arr till max length of the dataset
train_padded_txt = pad_sequences(training_txt, maxlen=max_label_len, padding='post', value=len(recognizableChar))
valid_padded_txt = pad_sequences(valid_txt, maxlen=max_label_len, padding='post', value=len(recognizableChar))

# CRNN model
inputs = Input(shape=(32, 128, 1))

# convolution layer with kernel size (3,3)
conv_1 = Conv2D(64, (3, 3), activation='relu', padding='same')(inputs)
# pooling layer with kernel size (2,2)
pool_1 = MaxPool2D(pool_size=(2, 2), strides=2)(conv_1)

conv_2 = Conv2D(128, (3, 3), activation='relu', padding='same')(pool_1)
pool_2 = MaxPool2D(pool_size=(2, 2), strides=2)(conv_2)

conv_3 = Conv2D(256, (3, 3), activation='relu', padding='same')(pool_2)

conv_4 = Conv2D(256, (3, 3), activation='relu', padding='same')(conv_3)
# pooling layer with kernel size (2,1) maxpooling
pool_4 = MaxPool2D(pool_size=(2, 1))(conv_4)

conv_5 = Conv2D(512, (3, 3), activation='relu', padding='same')(pool_4)
# Batch normalization layer
batch_norm_5 = BatchNormalization()(conv_5)

conv_6 = Conv2D(512, (3, 3), activation='relu', padding='same')(batch_norm_5)
batch_norm_6 = BatchNormalization()(conv_6)
pool_6 = MaxPool2D(pool_size=(2, 1))(batch_norm_6)

conv_7 = Conv2D(512, (2, 2), activation='relu')(pool_6)

squeezed = Lambda(lambda x: K.squeeze(x, 1))(conv_7)

# bidirectional LSTM layers with units=128
#lstm makes this nn differ from basic charector recognition
blstm_1 = Bidirectional(LSTM(128, return_sequences=True, dropout=0.2))(squeezed)
blstm_2 = Bidirectional(LSTM(128, return_sequences=True, dropout=0.2))(blstm_1)

outputs = Dense(len(recognizableChar) + 1, activation='softmax')(blstm_2)

# model to be used at test time
act_model = Model(inputs, outputs)

labels = Input(name='the_labels', shape=[max_label_len], dtype='float32')
input_length = Input(name='input_length', shape=[1], dtype='int64')
label_length = Input(name='label_length', shape=[1], dtype='int64')


def ctc_lambda_func(args):
    # Defining the CTC loss for getting string handle repeated detection
    y_pred, labels, input_length, label_length = args

    return K.ctc_batch_cost(labels, y_pred, input_length, label_length)


loss_out = Lambda(ctc_lambda_func, output_shape=(1,), name='ctc')([outputs, labels, input_length, label_length])

# Including the CTC layer to train the model.
model = Model(inputs=[inputs, labels, input_length, label_length], outputs=loss_out)

model.compile(loss={'ctc': lambda y_true, y_pred: y_pred}, optimizer='adam')

filepath = "model/best_model.hdf5"
checkpoint = ModelCheckpoint(filepath=filepath, monitor='val_loss', verbose=1, save_best_only=True, mode='auto')
callbacks_list = [checkpoint]

training_img = np.array(training_img)
train_input_length = np.array(train_input_length)
train_label_length = np.array(train_label_length)

valid_img = np.array(valid_img)
valid_input_length = np.array(valid_input_length)
valid_label_length = np.array(valid_label_length)


batch_size = 256
epochs = 15
model.fit(x=[training_img, train_padded_txt, train_input_length, train_label_length],
          y=np.zeros(len(training_img)),
          batch_size=batch_size, epochs = epochs,
          validation_data = ([valid_img, valid_padded_txt, valid_input_length, valid_label_length],
          [np.zeros(len(valid_img))]), verbose = 1, callbacks = callbacks_list)