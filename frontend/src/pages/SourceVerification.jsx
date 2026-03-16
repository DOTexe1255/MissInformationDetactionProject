import React, { useState } from "react";

export default function SourceVerification() {

  const [source, setSource] = useState("");

  const handleVerify = () => {
    alert("Source verification will run here using your backend API.");
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <section className="py-16 border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">

          <h1 className="text-4xl font-bold mb-4">
            Source Verification
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Verify whether a news source, website, or article
            originates from a credible and trusted publisher.
          </p>

        </div>
      </section>


      {/* MAIN VERIFICATION CARD */}

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-8 shadow-lg">

            <h2 className="text-xl font-semibold mb-4">
              Enter Source URL
            </h2>

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="https://example-news.com/article"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={handleVerify}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
              >
                Verify
              </button>

            </div>

          </div>


          {/* RESULT PANEL */}

          <div className="mt-10 bg-neutral-900 border border-gray-800 rounded-xl p-6">

            <h3 className="text-lg font-semibold mb-3">
              Verification Result
            </h3>

            <p className="text-gray-400">
              After analysis, the system will provide:
            </p>

            <ul className="mt-4 space-y-2 text-gray-300">

              <li>• Source credibility score</li>

              <li>• Domain trust rating</li>

              <li>• Publisher reputation</li>

              <li>• Fact-check references</li>

            </ul>

          </div>

        </div>
      </section>


      {/* FOOTER */}

      <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
        © 2024 VeritasAI Source Verification
      </footer>

    </div>
  );
}