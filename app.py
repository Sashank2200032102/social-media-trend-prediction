from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/predict", methods=["GET"])
def predict():
    # ✅ Return multiple predictions for visualization
    predictions = [
        {"trend": "#AI", "confidence": 0.92},
        {"trend": "#MachineLearning", "confidence": 0.85},
        {"trend": "#DataScience", "confidence": 0.78},
        {"trend": "#Blockchain", "confidence": 0.66},
        {"trend": "#CyberSecurity", "confidence": 0.74},
    ]
    return jsonify(predictions)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
