import os
import requests
import difflib
import feedparser
from urllib.parse import quote_plus
from utils_keywords import extract_keywords

# Load API Keys (Correct Usage)
FACTCHECK_API_KEY = "AQ.Ab8RN6JUuBxaFejRxj2K8pqqHnfhlb9dV5a-ZdnElqRnv3gIPw"
NEWS_API_KEY = "AQ.Ab8RN6JUuBxaFejRxj2K8pqqHnfhlb9dV5a-ZdnElqRnv3gIPw"

# Google News RSS Scraper (NO API KEY)
def search_google_news_rss(query, max_results=5):
    try:
        if not query.strip():
            return []

        encoded_query = quote_plus(query)
        rss_url = (
            f"https://news.google.com/rss/search?"
            f"q={encoded_query}&hl=en-US&gl=US&ceid=US:en"
        )

        feed = feedparser.parse(rss_url)

        results = []
        for entry in feed.entries[:max_results]:
            results.append({
                "title": entry.title,
                "source": entry.source.title if "source" in entry else "Google News",
                "published": entry.published if "published" in entry else "N/A",
                "url": entry.link
            })

        return results
    except Exception:
        return []

# GOOGLE FACT CHECK API
def search_factcheck(query):
    try:
        if not FACTCHECK_API_KEY:
            return {"error": "FACTCHECK_API_KEY missing"}

        url = (
            "https://factchecktools.googleapis.com/v1alpha1/claims:search"
            f"?query={query}&key={FACTCHECK_API_KEY}"
        )

        res = requests.get(url)
        data = res.json()

        claims = data.get("claims", [])

        results = []
        for c in claims:
            review = c.get("claimReview", [{}])[0]
            results.append({
                "text": c.get("text"),
                "claimant": c.get("claimant"),
                "claimDate": c.get("claimDate"),
                "rating": review.get("textualRating", "Unknown"),
                "publisher": review.get("publisher", {}).get("name", "Unknown"),
            })

        return results
    except Exception:
        return []


# IMPROVED NEWSAPI SEARCH + FUZZY MATCHING

def search_newsapi(query):
    try:
        if not NEWS_API_KEY:
            return {"error": "NEWS_API_KEY missing"}

        keywords = extract_keywords(query)
        if not keywords:
            return {"matches": [], "best_match": None}

        q = " ".join(keywords)

        url = (
            "https://newsapi.org/v2/everything?"
            f"q={q}&language=en&sortBy=relevancy&pageSize=10&apiKey={NEWS_API_KEY}"
        )

        res = requests.get(url)
        data = res.json()

        articles = data.get("articles", [])

        if not articles:
            return {"matches": [], "best_match": None}

        scored_results = []
        for a in articles:
            title = a.get("title", "")
            score = difflib.SequenceMatcher(None, query.lower(), title.lower()).ratio()

            scored_results.append({
                "title": title,
                "description": a.get("description", ""),
                "source": a.get("source", {}).get("name", ""),
                "url": a.get("url"),
                "score": round(score, 4)
            })

        # Sort by similarity score
        scored_results = sorted(scored_results, key=lambda x: x["score"], reverse=True)

        return {
            "matches": scored_results[:5],
            "best_match": scored_results[0]
        }
    except Exception:
        return []
