# IMAGE TO TEXT CONVERTER WITHOUT pyTESSERACT

## Team Details
- **Team Name:** Kaash Project Ban Jaaye
- **Team Members:**
  - Akshay Gupta N
  - Ritvik Kalive
  - Soupreet dey

## Domain of Your Project
    Machine Learning

## Idea
The basic idea for the project was to implement an image to text engine without using available OCR Engines.
A CRNN is used with 7 Hidden Conv layers and 2 BLSTMs for the recognition part. Dataset for training 
was generated with the help of an opensource code. Fonts and background were provided to the generation program to generate over 150000 datapoints for training.


## Tech Stack Used
- Keras
- OpenCV


## Achievement So Far
The Neural Network is made and the relative losses and layers are adjusted. Data preprocessing
is also done by basic openCV funcions.

#### Work Left
One more NN can be used for finding and locating the text in an image.The Model need to be re-trained and optimized. ROCm will be used to
run the training process on the radeon gpu