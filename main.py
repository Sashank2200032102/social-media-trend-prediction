from fastapi import FastAPI
from pydantic import BaseModel
from model import TrendPredictor
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Load ML model
predictor = TrendPredictor()

# Input schema
class TextData(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "🚀 Social Media Trend Prediction API is running!"}

@app.post("/predict")
def predict_trend(data: TextData):
    result = predictor.predict(data.text)
    return {"trend": result}

# Entry point
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
