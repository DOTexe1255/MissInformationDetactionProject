from flask import Flask, request, jsonify
from flask_cors import CORS
from evidence_clients import search_factcheck, search_newsapi, search_google_news_rss
import torch
from transformers import BertTokenizer, BertForSequenceClassification

app = Flask(__name__)
CORS(app)

MODEL_PATH = "./bert_fake_news_model"
TEMPERATURE = 2.0

tokenizer = BertTokenizer.from_pretrained(MODEL_PATH)
model = BertForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# -------------------------------------------------
# Detect search / keyword queries
# -------------------------------------------------
def is_search_query(text: str):
    words = text.split()

    if len(words) < 5:
        return True

    if text.endswith("?"):
        return True

    verbs = [
        "is","are","was","were","has","have","had",
        "did","does","said","claims","announces",
        "reveals","confirms","denies"
    ]

    return not any(v in text.lower() for v in verbs)


# -------------------------------------------------
# Detect extraordinary claims
# -------------------------------------------------
def looks_like_extraordinary_claim(text):

    keywords = [
        "alien","aliens","ufo","time travel",
        "immortal","secret government",
        "mind control","lizard people"
    ]

    text = text.lower()

    return any(k in text for k in keywords)


# -------------------------------------------------
# Model Prediction
# -------------------------------------------------
def predict_text(text):

    if len(text.split()) < 12:
        formatted = text + " [SEP] This is a headline."
    else:
        formatted = "News Article [SEP] " + text

    encoded = tokenizer(
        formatted,
        truncation=True,
        padding=True,
        max_length=256,
        return_tensors="pt"
    )

    encoded = {k: v.to(device) for k, v in encoded.items()}

    with torch.no_grad():

        outputs = model(**encoded)
        logits = outputs.logits

        pred_class = torch.argmax(logits, dim=1).item()

        probs = torch.softmax(logits / TEMPERATURE, dim=1)
        confidence = probs[0][pred_class].item()

    label = "REAL" if pred_class == 1 else "FAKE"

    return label, round(confidence,4), formatted


# -------------------------------------------------
# VERIFY API
# -------------------------------------------------
@app.route("/verify", methods=["POST"])
def verify_news():

    data = request.get_json()
    text = data.get("text","").strip()

    if not text:
        return jsonify({"error":"No text provided"}),400


    # ----------------------------
    # SEARCH QUERY HANDLING
    # ----------------------------
    if is_search_query(text):

        google_news = search_google_news_rss(text)
        newsapi = search_newsapi(text)

        if google_news or newsapi:

            return jsonify({
                "claim_type":"SEARCH_QUERY",
                "final_verdict":"INFORMATIONAL",
                "reasons":[
                    "Input appears to be an information seeking query.",
                    "Related news articles found."
                ],
                "google_news":google_news,
                "newsapi_matches":newsapi
            })

        else:

            return jsonify({
                "claim_type":"SEARCH_QUERY",
                "final_verdict":"UNVERIFIED",
                "reasons":[
                    "Input appears to be a keyword query.",
                    "No authoritative sources matched."
                ]
            })


    # ----------------------------
    # 1 Model Prediction
    # ----------------------------
    predicted_label, model_conf, formatted = predict_text(text)


    # ----------------------------
    # 2 External Evidence
    # ----------------------------
    factcheck_results = search_factcheck(text)
    google_news_results = search_google_news_rss(text)
    newsapi_results = search_newsapi(text)

    factcheck_evidence = factcheck_results if isinstance(factcheck_results,list) else []
    newsapi_articles = newsapi_results if isinstance(newsapi_results,list) else []


    # ----------------------------
    # 3 Final Verdict Logic
    # ----------------------------
    final_verdict = "UNVERIFIED"
    reasons = []


    # Extraordinary claim warning
    if looks_like_extraordinary_claim(text):

        reasons.append(
            "Extraordinary claim detected. Requires strong evidence."
        )


    # Google Fact Check (highest priority)
    for fc in factcheck_evidence:

        rating = fc.get("rating","").lower()

        if any(w in rating for w in ["false","pants","fake","misleading"]):

            final_verdict = "FAKE"
            reasons.append(
                "Google Fact Check marked the claim as false."
            )
            break


        if any(w in rating for w in ["true","correct","accurate"]):

            final_verdict = "REAL"
            reasons.append(
                "Google Fact Check marked the claim as true."
            )
            break


    # Multiple trusted news sources
    if final_verdict == "UNVERIFIED":

        source_count = len(google_news_results) + len(newsapi_articles)

        if source_count >= 3:

            final_verdict = "LIKELY REAL"

            reasons.append(
                "Multiple trusted news sources reported related information."
            )


    # Fallback to model
    if final_verdict == "UNVERIFIED":

        final_verdict = predicted_label

        reasons.append(
            "No strong external verification found. Model prediction used."
        )


    # ----------------------------
    # 4 Response
    # ----------------------------
    response = {

        "input_text":text,
        "formatted_text":formatted,

        "model_prediction":predicted_label,
        "model_confidence":model_conf,

        "final_verdict":final_verdict,
        "reasons":reasons,

        "factcheck_evidence":factcheck_evidence,
        "google_news":google_news_results,
        "newsapi_matches":newsapi_articles
    }

    return jsonify(response)


# ----------------------------
# RUN SERVER
# ----------------------------
if __name__ == "__main__":

    app.run(
        debug=True,
        use_reloader=False,
        host="0.0.0.0",
        port=5001
    )