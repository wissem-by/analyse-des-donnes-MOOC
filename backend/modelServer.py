from flask import Flask, abort, jsonify, request
import json
import numpy as np
import pickle
app = Flask(__name__)

# Use pickle to load in the pre-trained model.
with open(f'dataset.pkl', 'rb') as f:
    model = pickle.load(f)
    
app = Flask(__name__)

@app.route('/api', methods=['POST'])
def make_predict():
   
   data = request.get_json()
   prediction = np.array2string(model.predict(data)[0])
   
   return jsonify(prediction)

if __name__ == '__main__':
   app.run(port=9000)