from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# TODO: Import your ML model here
# Example:
# from joblib import load
# model = load('your_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features from the request
        features = {
            'age': float(data['age']),
            'gender': data['gender'],
            'maritalStatus': data['maritalStatus'],
            'heartDisease': data['heartDisease'] == 'yes',
            'hypertension': data['hypertension'] == 'yes',
            'glucoseLevel': float(data['glucoseLevel']),
            'bmi': float(data['bmi']),
            'residenceType': data['residenceType'],
            'smokingStatus': data['smokingStatus'],
            'workType': data['workType']
        }
        
        # TODO: Preprocess your features and make prediction with your model
        # Example:
        # prediction = model.predict([list_of_features])
        
        # For demonstration, returning mock prediction
        mock_risk_score = np.random.randint(0, 100)
        
        # Determine risk level based on score
        risk_level = "Low" if mock_risk_score < 33 else "Moderate" if mock_risk_score < 66 else "High"
        
        # Generate recommendations based on risk level
        recommendations = [
            "Maintain a healthy diet and exercise regularly",
            "Monitor your blood pressure and glucose levels",
            "Schedule regular check-ups with your healthcare provider"
        ]
        
        if mock_risk_score > 50:
            recommendations.append("Consider consulting a specialist for detailed evaluation")
        
        return jsonify({
            'riskScore': float(mock_risk_score),
            'riskLevel': risk_level,
            'recommendations': recommendations
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)