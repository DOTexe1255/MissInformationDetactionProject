import { analysisStatsData, recentDetectionsData } from "../data/data";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import React from "react";
export default function Dashboard() {
  const navigate = useNavigate();
  const[input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    navigate("/AiBot", {
      state: { message: input }
    });
  };



  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl p-8 shadow-xl">

              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold text-primary">
                  Real-time Analysis Dashboard
                </h4>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              </div>

              <div className="space-y-6">

                {analysisStatsData.map((item, i) => (
                  <div key={i} className="bg-neutral-50 rounded-lg p-4">

                    <div className="flex justify-between mb-2">
                      <span className="text-neutral-500">{item.label}</span>

                      <span
                        className={`text-sm ${item.trend === "up"
                          ? "text-green-600"
                          : "text-yellow-600"
                          }`}
                      >
                        {item.change}
                      </span>
                    </div>

                    <div className="text-2xl font-bold">
                      {item.value}
                    </div>

                  </div>
                ))}

              </div>

              {/* RECENT DETECTIONS */}

              <div className="mt-8">

                <div className="flex justify-between mb-4">
                  <h5 className="font-semibold">Recent Detections</h5>
                  <span className="text-sm text-neutral-500">
                    Last 24 hours
                  </span>
                </div>

                <div className="space-y-3">

                  {recentDetectionsData.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between p-3 bg-neutral-50 rounded-lg"
                    >

                      <div>
                        <div className="font-medium">
                          {item.title}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {item.type}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">
                          {item.confidence}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {item.time}
                        </div>
                      </div>

                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE CHATBOT */}

          <div className="lg:w-1/2">

            <h3 className="text-3xl font-bold mb-6">
              Advanced AI News Analyst
            </h3>

            <p className="text-lg text-neutral-600 mb-8">
              Our AI chatbot analyzes news articles and verifies
              credibility, sources, and bias patterns.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

              <div className="flex items-start space-x-4">

                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <i className="fas fa-robot text-white"></i>
                </div>

                <div>

                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">
                      VerifAI Assistant
                    </span>
                    <span className="text-xs text-neutral-500">
                      Online
                    </span>
                  </div>

                  <p className="text-neutral-700">
                    I can analyze this article's credibility,
                    verify sources, and detect manipulation
                    techniques.
                  </p>

                </div>
              </div>

            </div>

            <div className="flex space-x-4">

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about any news article..."
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <button onClick={handleSend} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                <i className="fas fa-paper-plane"></i>
              </button>
             

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}