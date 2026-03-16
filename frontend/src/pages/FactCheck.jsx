import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      console.error(err);
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
      console.error(err);
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a101d', padding: '2.5rem' }}>
      <Container maxWidth="md" sx={{ mt: 0 }}>
        <Card sx={{ p: 4, boxShadow: 6, bgcolor: "#101a34", color: "white" }}>
          <CardContent>
            <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: 'white' }}>
              📰 Multi-Source Fake News Checker
            </Typography>

          <TextField
            label="Enter News / Headline / Article"
            multiline
            rows={4}
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            fullWidth
            sx={{ mb: 3, bgcolor: "#1f2f4f", borderRadius: 2 }}
            InputProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
          />

          {error && (
            <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handlePredict}
            fullWidth
            sx={{ mb: 2, backgroundColor: "#0077e6", '&:hover': { backgroundColor: '#0059a6' } }}
          >
            {loadingPredict ? "Predicting..." : "🔍 Simple Prediction (BERT)"}
          </Button>

          {loadingPredict && (
            <CircularProgress sx={{ display: "block", mx: "auto", color: "#0077e6" }} />
          )}

          {simpleResult && (
            <Card sx={{ mt: 3, p: 2, bgcolor: "#0f1637", border: "1px solid #2c3e50", color: 'white' }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Simple Prediction Result
              </Typography>
              {simpleResult.error ? (
                <Typography sx={{ color: '#f87171' }}>{simpleResult.error}</Typography>
              ) : (
                <>
                  <Typography sx={{ color: 'white' }}>
                    <strong>Prediction:</strong> {simpleResult.prediction}
                  </Typography>
                  <Typography sx={{ color: 'white' }}>
                    <strong>Confidence:</strong> {simpleResult.confidence}
                  </Typography>
                  {simpleResult.combined_used && (
                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                      <strong>Input used:</strong> {simpleResult.combined_used}
                    </Typography>
                  )}
                </>
              )}
            </Card>
          )}

          <Divider sx={{ my: 4, borderColor: '#2c3e50' }} />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleVerify}
            fullWidth
            sx={{ mb: 2, backgroundColor: "#0485d1", '&:hover': { backgroundColor: '#036ab0' } }}
          >
            {loadingVerify ? "Verifying..." : "🔎 Full Verification (Fact Check + Google News + NewsAPI)"}
          </Button>

          {loadingVerify && (
            <CircularProgress sx={{ display: "block", mx: "auto", color: "#43a047" }} />
          )}

          {verifyResult && (
            <Card sx={{ mt: 3, p: 3, bgcolor: "#0f1637", border: "1px solid #2c3e50", color: 'white' }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                Final Verdict:{" "}
                <span
                  style={{
                    color:
                      verifyResult.final_verdict === "FAKE"
                        ? "#f87171"
                        : verifyResult.final_verdict === "REAL"
                        ? "#34d399"
                        : "#f59e0b",
                  }}
                >
                  {verifyResult.final_verdict || "N/A"}
                </span>
              </Typography>
              <Typography>
                Model Confidence: {verifyResult.model_confidence || "N/A"}
              </Typography>

              {verifyResult.error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {verifyResult.error}
                </Typography>
              )}

              {verifyResult.reasons?.length > 0 && (
                <>
                  <Divider sx={{ my: 2, borderColor: '#2c3e50' }} />
                  <Typography variant="h6">Why this result?</Typography>
                  {verifyResult.reasons.map((r, i) => (
                    <Typography key={i}>• {r}</Typography>
                  ))}
                </>
              )}

              <Divider sx={{ my: 3, borderColor: '#2c3e50' }} />

              <Accordion sx={{ bgcolor: '#0f172a', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>📰 Google Fact Check Evidence</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {(verifyResult.factcheck_evidence || []).length > 0 ? (
                    verifyResult.factcheck_evidence.map((fc, i) => (
                      <Card key={i} sx={{ bgcolor: '#1a1f2f', p: 2, mb: 1 }}>
                        <Typography><strong>Claim:</strong> {fc.text}</Typography>
                        <Typography><strong>Rating:</strong> {fc.rating}</Typography>
                        <Typography><strong>Publisher:</strong> {fc.publisher}</Typography>
                      </Card>
                    ))
                  ) : (
                    <Typography>No fact-check evidence found.</Typography>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ bgcolor: '#0f172a', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>🗞 Google News RSS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {(verifyResult.google_news || []).length > 0 ? (
                    verifyResult.google_news.map((g, i) => (
                      <Typography key={i} sx={{ mb: 1 }}>
                        • <a href={g.url} target="_blank" rel="noopener noreferrer" style={{ color: '#90caf9' }}>{g.title}</a> ({g.source})
                      </Typography>
                    ))
                  ) : (
                    <Typography>No Google News articles found.</Typography>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ bgcolor: '#0f172a', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>📰 NewsAPI Articles</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {(verifyResult.newsapi_matches || []).length > 0 ? (
                    verifyResult.newsapi_matches.map((n, i) => (
                      <Typography key={i} sx={{ mb: 1 }}>
                        • <a href={n.url} target="_blank" rel="noopener noreferrer" style={{ color: '#90caf9' }}>{n.title}</a> ({n.source})
                      </Typography>
                    ))
                  ) : (
                    <Typography>No NewsAPI articles found.</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </Card>
          )}
        </CardContent>
      </Card>
    </Container>
  </div>
  );
};

export default FactCheck;