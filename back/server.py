import math
from flask import Flask, jsonify, request
import pandas as pd
import os

from model.prediction import predict_from_image_name_json

app = Flask(__name__)
CORS(app)

# path = os.getcwd()
# print(path)

def read_styles_csv():
    csv_path = os.path.join('model/dataset', 'styles.csv')
    return pd.read_csv(csv_path, on_bad_lines='skip').to_dict(orient='records')

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

class AI:
    ...

@app.route("/predict")
def predict():
#     
#  "imageData": "http://amazon/jkk00.png"
# url = body['imaegData']
# img = urlReadImg(url)
#  // AI
#     
#     
    return "<p>Result is ....</p>"

@app.route('/api/fashion/searchbyuser', methods=['GET', 'POST'])
def searchByUser():
    styles = read_styles_csv()  # อ่านข้อมูลจาก CSV
    search_results = []
    total_results = 0  # ตัวแปรเก็บจำนวนผลลัพธ์ทั้งหมดที่ค้นพบ

    if request.method == 'POST':
        query = request.form.get('query')

        # ถ้าผู้ใช้ไม่กรอกข้อมูลในช่องค้นหา
        if not query:
            return jsonify({"message": "กรุณากรอกคำค้นหา"}), 400  # ส่งสถานะ 400 พร้อมข้อความแจ้งเตือน

        query = query.lower()
        # ค้นหาสินค้าที่ตรงกับคำค้นหาใน productDisplayName
        search_results = [style for style in styles if isinstance(style['productDisplayName'], str) and query in style['productDisplayName'].lower()]

        # จำกัดจำนวนผลลัพธ์ไม่ให้เกิน 100 ชิ้น
        search_results = search_results[:100]

        # เก็บจำนวนผลลัพธ์ทั้งหมด
        total_results = len(search_results)

        # ตรวจสอบและจัดการค่า NaN หรือ None ก่อนสร้าง JSON
        for result in search_results:
            # ตรวจสอบและจัดการค่า NaN หรือ None สำหรับทุกฟิลด์ที่เกี่ยวข้อง
            for key, value in result.items():
                if value is None or (isinstance(value, float) and math.isnan(value)):
                    result[key] = ""  # กำหนดค่าว่างถ้าค่าเป็น NaN หรือ None

            # เพิ่ม image path สำหรับแต่ละผลลัพธ์ โดยใช้ id.jpg
            result['image'] = f"{result['id']}.jpg"

    # ส่งผลลัพธ์ทั้งหมดในรูปแบบ JSON รวมถึง image ที่สร้างจาก id
    return jsonify({"total_results": total_results, "results": search_results})

@app.route('/api/fashion/searchbytype', methods=['GET', 'POST'])
def searchByType():
    styles = read_styles_csv()  # อ่านข้อมูลจาก CSV
    search_results = []
    total_results = 0  # ตัวแปรเก็บจำนวนผลลัพธ์ทั้งหมดที่ค้นพบ

    if request.method == 'POST':
        query = request.form.get('query')

        # ถ้าผู้ใช้ไม่กรอกข้อมูลในช่องค้นหา
        if not query:
            return jsonify({"message": "กรุณากรอกคำค้นหา"}), 400  # ส่งสถานะ 400 พร้อมข้อความแจ้งเตือน

        query = query.lower()
        # ค้นหาสินค้าที่ตรงกับคำค้นหาใน articleType
        # search_results = [style for style in styles if isinstance(style['articleType'], str) and query in style['articleType'].lower()]
        search_results = [style for style in styles if isinstance(style['articleType'], str) and style['articleType'].lower() == query]

        # จำกัดจำนวนผลลัพธ์ไม่ให้เกิน 100 ชิ้น
        search_results = search_results[:100]

        # เก็บจำนวนผลลัพธ์ทั้งหมด
        total_results = len(search_results)

        # ตรวจสอบและจัดการค่า NaN หรือ None ก่อนสร้าง JSON
        for result in search_results:
            # ตรวจสอบและจัดการค่า NaN หรือ None สำหรับทุกฟิลด์ที่เกี่ยวข้อง
            for key, value in result.items():
                if value is None or (isinstance(value, float) and math.isnan(value)):
                    result[key] = ""  # กำหนดค่าว่างถ้าค่าเป็น NaN หรือ None

            # เพิ่ม image path สำหรับแต่ละผลลัพธ์ โดยใช้ id.jpg
            result['image'] = f"{result['id']}.jpg"

    # ส่งผลลัพธ์ทั้งหมดในรูปแบบ JSON รวมถึง image ที่สร้างจาก id
    return jsonify({"total_results": total_results, "results": search_results})

@app.route('/api/predict/<int:image_id>', methods=['GET'])
def predict_image(image_id):
    result = predict_from_image_name_json(str(image_id))  # เรียกใช้ฟังก์ชัน predict ที่ส่งคืนค่า JSON
    if "error" in result:
        return jsonify(result), 404
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)