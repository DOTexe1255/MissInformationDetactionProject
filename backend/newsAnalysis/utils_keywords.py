import re
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")

stop_words = set(stopwords.words("english"))

def extract_keywords(text):
    """Extract meaningful keywords from a news headline or article."""
    text = re.sub(r"[^a-zA-Z0-9 ]", " ", text)
    words = [w.lower() for w in text.split() if w.lower() not in stop_words]

    # Keep only important words (remove short words)
    keywords = [w for w in words if len(w) > 3]

    # Limit to top 7 keywords
    return keywords[:7]
