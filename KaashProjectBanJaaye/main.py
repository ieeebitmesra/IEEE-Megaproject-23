import numpy as np
import cv2
from matplotlib import pyplot as plt
import string


def sharpenImage(im):  # Need to check if sharpening input images would help accuracy
    kernel = np.ones((3, 3), np.float32) / 90
    im = cv2.filter2D(im, -1, kernel)  # -1 means depth of image remains unchanged
    im = cv2.adaptiveThreshold(im, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 1)
    im = 255 - im
    cv2.imwrite("DATA/sharpend.jpeg",im)
    return im

img = sharpenImage(img)


def alignImg(im):
    coords = np.column_stack(np.where(im > 0))
    angle = cv2.minAreaRect(coords)[-1]  # -1 denotes angle parameter

    if angle < -45:
        angle = -(angle + 90)
    else:
        angle = -angle
    h, w = im.shape  # height and width of img
    center = (w // 2, h // 2)
    rotMatrix = cv2.getRotationMatrix2D(center, angle, 1) #rotates the min area rectangle
    rotated = cv2.warpAffine(img, rotMatrix, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return rotated


img = alignImg(img)

pixelSum = np.sum(img == 255, axis=1)
rows = []
seg = []

#ml model can be trained with annotated data for extracting text from various situations
for i in range(len(pixelSum)):
    if pixelSum[i] > 20:
        seg.append(i)

    if (pixelSum[i] <= 20) & (len(seg) >= 20):
        rows.append(seg)
        seg = []

    if len(seg) > 50:
        rows.append(seg)
        seg = []

print("NO OF LINES", len(rows)) #rows contains pixel coordinates of all lines

