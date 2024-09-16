from flask import Flask

# if __name__ == '__main__':
#     print("main program started")


# ! how to run backend server 
# flask --app server run
# [server] is name of file (server.py)


app = Flask(__name__)

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