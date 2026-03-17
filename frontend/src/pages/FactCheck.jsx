import React, { useState } from "react";
import axios from "axios";

const FactCheck = () => {
  const [newsText, setNewsText] = useState("");
  const [simpleResult, setSimpleResult] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loadingPredict, setLoadingPredict] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_PREDICT = "http://127.0.0.1:5000/predict";
  const BACKEND_VERIFY = "http://127.0.0.1:5001/verify";

  const handlePredict = async () => {
    if (!newsText.trim()) {
      setError("Please enter news text or headline.");
      return;
    }
    setError("");
    setSimpleResult(null);
    setVerifyResult(null);
    setLoadingPredict(true);

    try {
      const response = await axios.post(BACKEND_PREDICT, { news: newsText });
      setSimpleResult(response.data);
    } catch (err) {
      setSimpleResult({ error: "Prediction backend not reachable" });
    } finally {
      setLoadingPredict(false);
    }
  };

  const handleVerify = async () => {
    if (!newsText.trim()) {
      setError("Please enter news text or headline.");
      return;
    }
    setError("");
    setVerifyResult(null);
    setLoadingVerify(true);

    try {
      const response = await axios.post(BACKEND_VERIFY, { text: newsText });
      setVerifyResult(response.data);
    } catch (err) {
      setVerifyResult({ error: "Verification backend not reachable" });
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          📰 Multi-Source Fake News Checker
        </h1>
        <p className="text-gray-300 text-sm">
          Verify news using AI + multiple trusted sources
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">

        {/* INPUT CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-black">
          <textarea
            rows={4}
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            placeholder="Paste news headline, article, or URL..."
            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg outline-none text-gray-800"
          />

          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={handlePredict}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white"
            >
              {loadingPredict ? "Predicting..." : "Quick Check"}
            </button>

            <button
              onClick={handleVerify}
              className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white"
            >
              {loadingVerify ? "Verifying..." : "Full Verification"}
            </button>
          </div>
        </div>

        {/* SIMPLE RESULT */}
        {simpleResult && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-black">
            <h2 className="text-lg font-semibold mb-3">Quick Result</h2>

            {simpleResult.error ? (
              <p className="text-red-500">{simpleResult.error}</p>
            ) : (
              <>
                <p><strong>Prediction:</strong> {simpleResult.prediction}</p>
                <p><strong>Confidence:</strong> {simpleResult.confidence}</p>
              </>
            )}
          </div>
        )}

        {/* FULL RESULT */}
        {verifyResult && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 text-black">

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Final Verdict</h2>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  verifyResult.final_verdict === "FAKE"
                    ? "bg-red-500 text-white"
                    : verifyResult.final_verdict === "REAL"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 text-black"
                }`}
              >
                {verifyResult.final_verdict || "N/A"}
              </span>
            </div>

            <p>Confidence: {verifyResult.model_confidence || "N/A"}</p>

            {verifyResult.error && (
              <p className="text-red-500">{verifyResult.error}</p>
            )}

            {/* REASONS */}
            {verifyResult.reasons?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Why?</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {verifyResult.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* FACT CHECK */}
            <div>
              <h3 className="font-semibold mb-2">Fact Check Evidence</h3>
              {(verifyResult.factcheck_evidence || []).length > 0 ? (
                verifyResult.factcheck_evidence.map((fc, i) => (
                  <div key={i} className="bg-gray-100 p-3 rounded mb-2">
                    <p><strong>Claim:</strong> {fc.text}</p>
                    <p><strong>Rating:</strong> {fc.rating}</p>
                    <p><strong>Publisher:</strong> {fc.publisher}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No evidence found</p>
              )}
            </div>

            {/* GOOGLE NEWS */}
            <div>
              <h3 className="font-semibold mb-2">Google News</h3>
              {(verifyResult.google_news || []).length > 0 ? (
                verifyResult.google_news.map((g, i) => (
                  <p key={i}>
                    •{" "}
                    <a href={g.url} target="_blank" className="text-blue-600">
                      {g.title}
                    </a>
                  </p>
                ))
              ) : (
                <p className="text-gray-500">No articles found</p>
              )}
            </div>

            {/* NEWS API */}
            <div>
              <h3 className="font-semibold mb-2">NewsAPI</h3>
              {(verifyResult.newsapi_matches || []).length > 0 ? (
                verifyResult.newsapi_matches.map((n, i) => (
                  <p key={i}>
                    •{" "}
                    <a href={n.url} target="_blank" className="text-blue-600">
                      {n.title}
                    </a>
                  </p>
                ))
              ) : (
                <p className="text-gray-500">No articles found</p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default FactCheck;