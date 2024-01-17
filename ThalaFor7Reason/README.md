# Image Captioning Tool

Image Captioning stands at the intersection of image processing and natural language understanding. This assignment aims to describe the content of an image by using CNNs and RNNs to build an Image Caption Generator. It will be implemented using Pytorch & the dataset used is the Flickr 8k dataset.


## Architecture

The model architecture consists of a CNN which extracts the features and encodes the input image and a Recurrent Neural Network (RNN) based on Long Short Term Memory (LSTM) layers which acts as the decoder. The model uses the Resnet50 for encoding the input image.

ResNet-50 is a convolutional neural network that is trained on more than a million images from the ImageNet database.

For Decoder we use LSTM. Long Short-Term Memory (LSTM) networks are a modified version of recurrent neural networks, which makes it easier to remember past data in memory. The vanishing gradient problem of RNN is resolved here.

## Developers

   1> Rahul Jha
   
   2> Shouryaman Singh
   
   3> Hritabhash Ray
## Final Deployed Model

Users can upload the images & the model predicts a caption depicting the image.

https://thalaforareason-07fe8a184816.herokuapp.com/

The above URL can be used to try out the model.

The model produces satisfactory results & use of transformers can be seen as part of future work to improve results.