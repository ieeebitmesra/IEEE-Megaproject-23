import string
import cv2
import numpy as np
from keras.layers import Dense, LSTM, Reshape, BatchNormalization, Input, Conv2D, MaxPool2D, Lambda, Bidirectional
from keras.models import Model
import keras.backend as K

recognizableChar = string.digits + string.ascii_letters + string.punctuation


def encodeText(txt):
    digitList = []
    for char in txt:
        try:
            digitList.append(recognizableChar.index(char))
        except:
            print(char)

    return digitList


size = (32, 128)


def sharpenImage(im):  # Need to check if sharpening input images would help accuracy
    kernel = np.ones((3, 3), np.float32) / 90
    im = cv2.filter2D(im, -1, kernel)  # -1 means depth of image remains unchanged
    im = cv2.adaptiveThreshold(im, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 1)
    im = 255 - im
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
            canvas[i][j] = max(canvas[i][j], npImg[i][j])
    cv2.imwrite("DATA/Test.jpeg", canvas)
    return canvas


input = Input(shape=(32, 128, 1))
conv_1 = Conv2D(64, (3, 3), activation='relu', padding='same')(input)
pool_1 = MaxPool2D(pool_size=(2, 2), strides=2)(conv_1)

conv_2 = Conv2D(128, (3, 3), activation='relu', padding='same')(pool_1)
pool_2 = MaxPool2D(pool_size=(2, 2), strides=2)(conv_2)

conv_3 = Conv2D(256, (3, 3), activation='relu', padding='same')(pool_2)

conv_4 = Conv2D(256, (3, 3), activation='relu', padding='same')(conv_3)
pool_4 = MaxPool2D(pool_size=(2, 1))(conv_4)

conv_5 = Conv2D(512, (3, 3), activation='relu', padding='same')(pool_4)
batch_norm_5 = BatchNormalization()(conv_5)

conv_6 = Conv2D(512, (3, 3), activation='relu', padding='same')(batch_norm_5)
batch_norm_6 = BatchNormalization()(conv_6)
pool_6 = MaxPool2D(pool_size=(2, 1))(batch_norm_6)

conv_7 = Conv2D(512, (2, 2), activation='relu')(pool_6)

squeezed = Lambda(lambda x: K.squeeze(x, 1))(conv_7)

blstm_1 = Bidirectional(LSTM(128, return_sequences=True, dropout=0.2))(squeezed)
blstm_2 = Bidirectional(LSTM(128, return_sequences=True, dropout=0.2))(blstm_1)

outputs = Dense(len(recognizableChar) + 1, activation='softmax')(blstm_2)

act_model = Model(input, outputs)
