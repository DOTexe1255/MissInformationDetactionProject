from flask import Flask, request, jsonify
from transformers import BertTokenizer, BertForSequenceClassification
import torch
from flask_cors import CORS
import os

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Load the model
MODEL_PATH = "./bert_fake_news_model"

print("🔄 Loading BERT model...")
tokenizer = BertTokenizer.from_pretrained(MODEL_PATH)
model = BertForSequenceClassification.from_pretrained(MODEL_PATH)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

# Function to match EXACT training format (VERY IMPORTANT)
def build_input(title: str, text: str):
    title = (title or "").strip()
    text = (text or "").strip()

    # CASE 1: Only title
    if title and not text:
        # short titles need minimal context
        if len(title.split()) < 12:
            return title + " [SEP] This is a news headline."
        return title + " [SEP] "

    # CASE 2: Only text
    if text and not title:
        return "News Article [SEP] " + text

    # CASE 3: Both title + full article
    return f"{title} [SEP] {text}"

# Prediction Function
def predict_news(title="", text=""):
    combined = build_input(title, text)

    inputs = tokenizer(
        combined,
        truncation=True,
        padding=True,
        max_length=256,
        return_tensors="pt"
    )

    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class = torch.argmax(logits, dim=1).item()
        prob = torch.softmax(logits, dim=1)[0][predicted_class].item()

    label = "REAL" if predicted_class == 1 else "FAKE"

    return {
        "prediction": label,
        "confidence": round(prob, 4),
        "combined_used": combined  
    }

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Fake News Detection API is running 🚀"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON received"}), 400

    title = data.get("title", "")
    text = data.get("text", "")
    news = data.get("news", "")

    # If frontend only sends one field
    if news and not title and not text:
        # short → treat as title, long → treat as text
        if len(news.split()) < 12:
            title = news
        else:
            text = news

    # Now call prediction
    result = predict_news(title, text)
    return jsonify(result)

# Run server
if __name__ == "__main__":
    # app.run(debug=True, host="0.0.0.0", port=5000)
    app.run(debug=True, use_reloader=False, host="0.0.0.0", port=5000)
