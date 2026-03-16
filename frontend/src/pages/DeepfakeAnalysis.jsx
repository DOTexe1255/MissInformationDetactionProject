import { useState } from "react";
import React from "react";
export default function DeepfakeAnalysis() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = () => {
    alert("Deepfake analysis will run here using your ML model.");
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}

      <section className="py-16 border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">

          <h1 className="text-4xl font-bold mb-4">
            Deepfake Video Analysis
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a video to analyze whether it has been manipulated using
            deepfake technology. Our AI models detect facial inconsistencies,
            temporal artifacts, and synthetic video generation.
          </p>

        </div>
      </section>


      {/* MAIN CONTENT */}

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">

          <div className="bg-neutral-900 rounded-xl shadow-xl p-8 border border-gray-800">

            {/* Upload Area */}

            <div className="border-2 border-dashed border-gray-700 rounded-lg p-10 text-center">

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

                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-video text-2xl"></i>
                </div>

                <p className="font-semibold">
                  Click to upload a video
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  MP4, MOV, AVI supported
                </p>

              </label>

            </div>


            {/* VIDEO PREVIEW */}

            {preview && (
              <div className="mt-8">

                <h3 className="text-lg font-semibold mb-4 text-center">
                  Video Preview
                </h3>

                <video
                  src={preview}
                  controls
                  className="w-full rounded-lg shadow-lg"
                />

              </div>
            )}


            {/* ANALYZE BUTTON */}

            <div className="mt-8 text-center">

              <button
                onClick={handleAnalyze}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
              >
                Analyze Video
              </button>

            </div>

          </div>


          {/* RESULT PANEL */}

          <div className="mt-12 bg-neutral-900 border border-gray-800 rounded-xl p-6">

            <h3 className="text-xl font-bold mb-4">
              Analysis Result
            </h3>

            <p className="text-gray-400">
              After processing, the system will display:
            </p>

            <ul className="mt-4 space-y-2 text-gray-300">

              <li>• Deepfake Probability</li>
              <li>• Face Manipulation Detection</li>
              <li>• Frame-level Anomalies</li>
              <li>• Confidence Score</li>

            </ul>

          </div>

        </div>
      </section>

    </div>
  );
}