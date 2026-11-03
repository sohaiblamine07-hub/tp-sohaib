import os
import requests
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def call_b():
    service_b_url = os.environ.get('SERVICE_B_URL', 'http://localhost:8080')
    
    try:
        response = requests.get(service_b_url)
        data_from_b = response.json()
    except Exception as e:
        data_from_b = {"error": str(e)}
        
    return jsonify({
        "service": "A",
        "language": "Python",
        "response_from_b": data_from_b
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)