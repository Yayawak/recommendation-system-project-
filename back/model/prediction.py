# import all the important modules
import numpy as np
import tensorflow
from tensorflow import keras
from keras.api.preprocessing import image as keras_image
from keras.api.layers import GlobalMaxPooling2D
from keras.api.applications.resnet50 import ResNet50, preprocess_input

from numpy.linalg import norm
import os
from tqdm import tqdm
import pickle
from sklearn.neighbors import NearestNeighbors
import cv2
import matplotlib.pyplot as plt
import pandas as pd

current_dir = os.path.dirname(__file__)
embiddings_path = os.path.join(current_dir, 'embiddings.pkl')
filenames_path = os.path.join(current_dir, 'filenames.pkl')


feature_list = pickle.load(open(embiddings_path,'rb'))
filenames = pickle.load(open(filenames_path,'rb'))

class Predictor:
    def __init__(self):
        #print(filenames)

        model = ResNet50(include_top = False, weights='imagenet',input_shape=(224,224,3))
        # we don't have to train the model
        model.trainable = False

        self.model = tensorflow.keras.Sequential([
            model,
            # we add our own layer
            GlobalMaxPooling2D()
        ])

        self.neighbor = NearestNeighbors(n_neighbors=5, algorithm='brute',metric='cosine')
        self.neighbor.fit(feature_list)

    # def predict(self, normalized_img):
    def predict(self, img):

        normalized_img = self.preprocess_image_array(img)
        # now we have to calculate the distance b/w the sample image norm_result and the feature_list
        # we use nearest neighbour algorithm

        distance, indices = self.neighbor.kneighbors([normalized_img])
        indices = indices[0]
        print("in indices of most similar image is ")
        print(indices)

        # return indices

        return [filenames[i].split('/')[2] for i in indices]
        # return [cv2.imread(filenames[i]) for i in indices]

        # for ind in indices[0]:
        #     print(ind)
        #     temp = cv2.imread(filenames[ind])
        #     cv2.imshow('output',cv2.resize(temp,(500,500)))
        #     cv2.waitKey(1000)
    
    

    def preprocess_image_array(self, img_file):
        img_array = keras_image.img_to_array(img_file)
        resized_img = cv2.resize(img_array, (224, 224))
        # img_path = "dataset/myntradataset/images/57488.jpg"



        # imag = image.load_img(img_path, target_size=(224, 224))
        # imag_array = image.img_to_array(img_file)
        image_expand = np.expand_dims(resized_img, axis=0)  # expanding dimens, because of keras condition....
        processed_image = preprocess_input(image_expand)
        result = self.model.predict(processed_image).flatten()
        norm_result = result / np.linalg.norm(result)

        return norm_result

predictor = Predictor()

# img = "dataset/images/1163.jpg"
# def predict_from_image_name(name_without_extension):
#     # img_path = "dataset/myntradataset/images/1526.jpg"
#     img_path = f"dataset/images/{name_without_extension}.jpg"
#     if not os.path.isfile(img_path):
#         msg = "no filename found on path [{}]".format(img_path)

#         print(msg)
#         return  msg
#     img_file = keras_image.load_img(img_path, target_size=(224, 224))

#     print(img_file)

filename_sims = predictor.predict(img_file)
# sims = [cv2.imread(filenames[i]) for i in similare_item_indices]
sims = [cv2.imread(f) for f in filename_sims]
sims = [cv2.cvtColor(img, cv2.COLOR_BGR2RGB) for img in sims]

#     # print(sims[0])

#     fig, subs = plt.subplots(2, 5)

#     # print(subs)
#     for i in range(2):
#         for j in range(5):
#             # im = sims[i]
#             sub = subs[i][j]
#             print(f"i = {i} & j = {j}")

#             if i == 0 and j == 0:
#                 sub.imshow(img_file)
#             if i == 1 and j >= 0:
#                 print("showing img" + str(j))
#                 sub.imshow(sims[j])
            
            

#     plt.show()

# img_path = "dataset/myntradataset/images/1526.jpg"
#  this row came from myntradataset folder -> collect from it
# 1530,Men,Apparel,Topwear,Jackets,Red,Fall,2010,Sports,Puma Men Ferrari Track Jacket
# predict_from_image_name("1530")

def predict_from_image_name_json(name_without_extension):
    # สร้าง path ของไฟล์ภาพจากชื่อไฟล์
    img_path = f"model/dataset/images/{name_without_extension}.jpg"
    
    # ตรวจสอบว่ามีไฟล์ภาพหรือไม่
    if not os.path.isfile(img_path):
        msg = {"error": f"no filename found on path [{img_path}]"}
        print(msg)
        return msg
    
    # โหลดภาพ
    img_file = keras_image.load_img(img_path, target_size=(224, 224))

    # ใช้โมเดลคำนวณหาภาพที่คล้ายกัน
    similar_item_indices = predictor.predict(img_file)
    
    # โหลดข้อมูลจาก styles.csv
    csv_path = "model/dataset/styles.csv"
    df = pd.read_csv(csv_path, on_bad_lines='skip')

    # ดึงข้อมูลของสินค้าที่คล้ายกันตามดัชนีที่ได้จากโมเดล
    similar_images = []
    for index in similar_item_indices:
        image_id = filenames[index].split('/')[-1].split('.')[0]  # ดึง ID ของภาพจากชื่อไฟล์
        product_info = df[df['id'] == int(image_id)].to_dict(orient='records')[0]  # ดึงข้อมูลจาก CSV
        product_info['image'] = f"{image_id}.jpg"  # เพิ่ม path ของรูปภาพ
        similar_images.append(product_info)  # เก็บข้อมูลลงในลิสต์

    # ส่งผลลัพธ์กลับเป็น JSON
    result = {"similar_images": similar_images}
    return result
