from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load and train the model when the server starts
def train_model():
    # Load sample stroke dataset (you should replace this with your actual dataset)
    data = pd.DataFrame({
        'age': np.random.uniform(20, 80, 1000),
        'gender': np.random.choice([0, 1, 2], 1000),
        'heart_disease': np.random.choice([0, 1], 1000),
        'hypertension': np.random.choice([0, 1], 1000),
        'glucose_level': np.random.uniform(70, 200, 1000),
        'bmi': np.random.uniform(18, 40, 1000),
        'residence_type': np.random.choice([0, 1], 1000),
        'smoking_status': np.random.choice([0, 1, 2], 1000),
        'work_type': np.random.choice([0, 1, 2, 3, 4], 1000),
    })
    
    # Create target variable (stroke risk) based on features
    data['stroke_risk'] = (
        (data['age'] > 60).astype(int) * 2 +
        (data['heart_disease'] == 1).astype(int) * 2 +
        (data['hypertension'] == 1).astype(int) * 2 +
        (data['glucose_level'] > 140).astype(int) +
        (data['bmi'] > 30).astype(int) +
        (data['smoking_status'] == 2).astype(int)
    ) / 10  # Normalize to 0-1 range

    # Prepare features for training
    X = data.drop('stroke_risk', axis=1)
    y = data['stroke_risk']

    # Initialize and train the model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    scaler = StandardScaler()
    
    X_scaled = scaler.fit_transform(X)
    model.fit(X_scaled, y)

    # Save the model and scaler
    joblib.dump(model, 'stroke_model.joblib')
    joblib.dump(scaler, 'scaler.joblib')
    
    return model, scaler

# Train and load the model and scaler
model, scaler = train_model()

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
        print("Received data:", data)  # Debug log
        
        features = preprocess_features(data)
        print("Preprocessed features:", features)  # Debug log
        
        # Scale features using the same scaler used during training
        scaled_features = scaler.transform(features)
        print("Scaled features:", scaled_features)  # Debug log
        
        # Get prediction probability
        prediction = model.predict(scaled_features)[0]
        print("Raw prediction:", prediction)  # Debug log
        
        # Convert to percentage (0-100)
        risk_score = float(prediction * 100)
        print("Risk score:", risk_score)  # Debug log
        
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
        
        response = {
            'riskScore': risk_score,
            'riskLevel': risk_level,
            'recommendations': recommendations
        }
        print("Sending response:", response)  # Debug log
        
        return jsonify(response)
        
    except Exception as e:
        print("Error occurred:", str(e))  # Debug log
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)