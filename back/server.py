from model.prediction import predictor
import numpy as np
import cv2

from flask import (
    Flask, 
    # render_template, 
    request,
    jsonify
)

# ! how to run backend server 
# flask --app server run
# [server] is name of file (server.py)

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

@app.route("/api/predict/byImageFile", methods=['POST'])
def predictByImageFile():
    data = {
    }
    if request.method == 'POST':
        file = request.files.get('img')
        if file and file.filename != '': 
            data['msg'] = f'success get {file.filename}'
            # Read the image file and convert to NumPy array
            file_bytes = np.frombuffer(file.read(), np.uint8)
            img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

            predicted_filenames = predictor.predict(img)
            data['data'] = predicted_filenames

        else:
            data['msg'] = f"need file named 'img' to predict."
            
    return jsonify(data), 200


app.run(debug=True, port=4000)
