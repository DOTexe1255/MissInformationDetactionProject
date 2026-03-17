import { useState } from "react";
import React from "react";

export default function DeepfakeAnalysis() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!video) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", video);

    try {
      const response = await fetch("http://127.0.0.1:8001/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.error(error);
      alert("Backend se response nahi mila! Check FastAPI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">

      {/* HERO */}
      <section className="py-10 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-3">
            Deepfake Video Analysis
          </h1>

          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Upload a video to analyze whether it has been manipulated using
            deepfake technology.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">

          <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">

            {/* UPLOAD */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleUpload}
                className="hidden"
                id="uploadVideo"
              />

              <label
                htmlFor="uploadVideo"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mb-3 text-xl">
  🎥
</div>

                <p className="font-semibold">
                  Click to upload a video
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  MP4, MOV, AVI supported
                </p>
              </label>
            </div>

            {/* PREVIEW */}
            {preview && (
              <div className="mt-6">

                <h3 className="text-md font-semibold mb-3 text-center">
                  Video Preview
                </h3>

                {/* Fixed 16:9 */}
                <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <video
                    src={preview}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* BUTTON */}
                <div className="mt-4 text-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      loading
                        ? "bg-gray-400 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {loading ? "Analyzing Video..." : "Analyze Video"}
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* RESULT */}
          {result && (
            <div className="mt-8 bg-white border border-gray-200 rounded-xl p-5">

              <h3 className="text-lg font-bold mb-4">
                Analysis Result
              </h3>

              <div className="space-y-2 text-sm text-gray-700">

                <p>
                  <span className="font-semibold">Prediction:</span>{" "}
                  <span className={
                    result.prediction === "Real"
                      ? "text-green-600"
                      : "text-red-600"
                  }>
                    {result.prediction}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Confidence:</span>{" "}
                  {result.confidence}
                </p>

                <p>
                  <span className="font-semibold">Frames Analyzed:</span>{" "}
                  {result.frames_analyzed}
                </p>

                <p>
                  <span className="font-semibold">Processing Time:</span>{" "}
                  {result.processing_time}
                </p>

              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}