import { useState } from "react";
import React from "react";

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
      setResult(null); // Reset result for new upload
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image); 

    try {
      // Direct call to your FastAPI at port 8000
      const response = await fetch("http://127.0.0.1:8000/detect-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server response not ok");

      const data = await response.json();
      setResult(data); 
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Backend se response nahi mila! Check if FastAPI is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">AI Detection Interface</h1>
        </div>

        <div className="p-8">
          {/* UPLOAD BOX */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="file-input" />
            <label htmlFor="file-input" className="cursor-pointer block">
              <p className="text-gray-600 font-medium">Click to select image</p>
            </label>
          </div>

          {/* PREVIEW */}
          {preview && (
            <div className="mt-6">
              <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-lg shadow-sm" />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`w-full mt-6 py-3 rounded-lg font-bold text-white transition ${
                  loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing Request..." : "Start AI Analysis"}
              </button>
            </div>
          )}

          {/* RESPONSE DISPLAY */}
          {result && (
            <div className={`mt-8 p-6 rounded-xl border-l-8 ${
              result.prediction === "Real" ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold">Detection Status</p>
                  <h2 className={`text-2xl font-black ${
                    result.prediction === "Real" ? "text-green-700" : "text-red-700"
                  }`}>
                    {result.prediction.toUpperCase()}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 uppercase font-bold">Confidence</p>
                  <p className="text-2xl font-mono font-bold text-gray-800">{result.confidence}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}