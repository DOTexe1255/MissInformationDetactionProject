import React, { useState } from "react";

export default function AiImageDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image); // 'file' matches backend parameter

    try {
      // Direct call to FastAPI
      const response = await fetch("http://127.0.0.1:8000/detect-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error or CORS blocked");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Backend se connect nahi ho paya. Make sure CORS is enabled in FastAPI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI Image Detector</h1>
        
        {/* Upload Box */}
        <div style={styles.uploadBox}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload} 
            id="fileInput" 
            style={{ display: 'none' }} 
          />
          <label htmlFor="fileInput" style={styles.uploadLabel}>
            {preview ? "Change Selected Image" : "Click to Upload Image"}
          </label>
        </div>

        {/* Preview Area */}
        {preview && (
          <div style={styles.previewContainer}>
            <img src={preview} alt="Preview" style={styles.image} />
            <button 
              onClick={handleAnalyze} 
              disabled={loading} 
              style={loading ? styles.buttonDisabled : styles.button}
            >
              {loading ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>
        )}

        {/* Result Area */}
        {result && (
          <div style={{
            ...styles.resultCard, 
            borderColor: result.prediction === "Real" ? "#22c55e" : "#ef4444"
          }}>
            <h3>Prediction: <strong>{result.prediction}</strong></h3>
            <p>Confidence: <strong>{result.confidence}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Styles taaki CSS ki tension na rahe
const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "40px 20px", fontFamily: "Arial" },
  card: { maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
  title: { textAlign: "center", marginBottom: "20px", color: "#1f2937" },
  uploadBox: { border: "2px dashed #d1d5db", padding: "20px", textAlign: "center", borderRadius: "8px", backgroundColor: "#f9fafb" },
  uploadLabel: { cursor: "pointer", color: "#2563eb", fontWeight: "bold" },
  previewContainer: { marginTop: "20px", textAlign: "center" },
  image: { maxWidth: "100%", maxHeight: "300px", borderRadius: "8px", marginBottom: "15px" },
  button: { width: "100%", padding: "12px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  buttonDisabled: { width: "100%", padding: "12px", backgroundColor: "#9ca3af", color: "#fff", border: "none", borderRadius: "6px", cursor: "not-allowed" },
  resultCard: { marginTop: "20px", padding: "15px", borderRadius: "8px", borderLeft: "6px solid", backgroundColor: "#f8fafc" }
};