# import all the important modules
import numpy as np
import tensorflow
import tensorflow.keras as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from numpy.linalg import norm
import os
from tqdm import tqdm
import pickle
from sklearn.neighbors import NearestNeighbors
import cv2

feature_list = pickle.load(open('../model/embiddings.pkl','rb'))
filenames = pickle.load(open('../model/filenames.pkl','rb'))
#print(filenames)

model = ResNet50(include_top = False, weights='imagenet',input_shape=(224,224,3))
# we don't have to train the model
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    # we add our own layer
    GlobalMaxPooling2D()
])

# img = "dataset/images/1163.jpg"
# img = "dataset/myntradataset/images/1526.jpg"

img = "../model/dataset/myntradataset/images/57488.jpg"


# we are using a sample image for testing the recommendation of the model
# we further take preprocessing steps over the image.
imag = image.load_img(img, target_size=(224, 224))
imag_array = image.img_to_array(imag)
image_expand = np.expand_dims(imag_array, axis=0)  # expanding dimens, because of keras condition....
processed_image = preprocess_input(image_expand)
result = model.predict(processed_image).flatten()
norm_result = result / np.linalg.norm(result)

# now we have to calculate the distance b/w the sample image norm_result and the feature_list
# we use nearest neighbour algorithm
neighbor = NearestNeighbors(n_neighbors=5, algorithm='brute',metric='cosine')
neighbor.fit(feature_list)

distance, indexs = neighbor.kneighbors([norm_result])
print(indexs)

filenames = ["../model/" + oldname  for oldname in filenames]

for ind in indexs[0]:
    print(ind)
    # print(filenames)
    temp = cv2.imread(filenames[ind])
    print(temp)
    cv2.imshow('output',cv2.resize(temp,(500,500)))
    cv2.waitKey(1000)
