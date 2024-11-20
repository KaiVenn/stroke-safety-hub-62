from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# TODO: Train and save your model using the stroke dataset
# Example workflow:
# 1. Load stroke dataset (e.g., from Kaggle)
# 2. Preprocess data (handle missing values, encode categorical variables)
# 3. Train model (e.g., RandomForestClassifier)
# 4. Save model using joblib:
#    joblib.dump(model, 'stroke_model.joblib')
#    joblib.dump(scaler, 'scaler.joblib')

# Placeholder for model loading
# model = joblib.load('stroke_model.joblib')
# scaler = joblib.load('scaler.joblib')

def preprocess_features(data):
    """Preprocess input features to match model requirements."""
    # Convert categorical variables to numeric
    gender_map = {'male': 0, 'female': 1, 'other': 2}
    smoking_map = {'never': 0, 'former': 1, 'current': 2}
    work_map = {'private': 0, 'self-employed': 1, 'government': 2, 'student': 3, 'retired': 4}
    residence_map = {'urban': 1, 'rural': 0}
    
    features = np.array([
        float(data['age']),
        gender_map.get(data['gender'], 0),
        1 if data['heartDisease'] == 'yes' else 0,
        1 if data['hypertension'] == 'yes' else 0,
        float(data['glucoseLevel']),
        float(data['bmi']),
        residence_map.get(data['residenceType'], 0),
        smoking_map.get(data['smokingStatus'], 0),
        work_map.get(data['workType'], 0)
    ]).reshape(1, -1)
    
    return features

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = preprocess_features(data)
        
        # TODO: Once you have your trained model, uncomment and modify these lines
        # scaled_features = scaler.transform(features)
        # prediction_proba = model.predict_proba(scaled_features)[0][1]
        # risk_score = float(prediction_proba * 100)
        
        # For demonstration, using mock prediction
        mock_risk_score = np.random.randint(0, 100)
        risk_score = float(mock_risk_score)
        
        # Determine risk level based on score
        if risk_score < 33:
            risk_level = "Low"
            recommendations = [
                "Maintain a healthy lifestyle with regular exercise",
                "Continue with routine health check-ups",
                "Keep monitoring blood pressure and glucose levels"
            ]
        elif risk_score < 66:
            risk_level = "Moderate"
            recommendations = [
                "Increase physical activity to at least 150 minutes per week",
                "Monitor blood pressure and glucose levels more frequently",
                "Consider dietary modifications to reduce stroke risk",
                "Schedule regular check-ups with your healthcare provider"
            ]
        else:
            risk_level = "High"
            recommendations = [
                "Consult with a healthcare provider immediately",
                "Monitor blood pressure and glucose levels daily",
                "Make immediate lifestyle changes including diet and exercise",
                "Consider medication review with your doctor",
                "Develop an emergency action plan with your healthcare team"
            ]
        
        return jsonify({
            'riskScore': risk_score,
            'riskLevel': risk_level,
            'recommendations': recommendations
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)