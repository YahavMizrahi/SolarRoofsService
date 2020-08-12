from flask import Flask, request
from flask_cors import CORS

from image_analysis import analyze, check_img

app = Flask(__name__)
CORS(app)


@app.route('/checkIMG/<index>', methods=['GET'])
def check(index=None):
     if request.method == 'GET':
          return {'repsonse': check_img(index)}
     else:
          return {'response': 'error'}


@app.route('/getArea/<index>', methods=['GET'])
def home(index=None):
    if request.method == 'GET':
         res = analyze(index)
         return {'response': res}
    else:
         return {'response': 'error'}

