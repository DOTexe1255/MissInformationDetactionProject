import React, { useState } from "react";

export default function AiNewsAnalyst() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {

    if (!question.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", text: question },
      {
        role: "ai",
        text: "AI analysis will appear here. It will evaluate credibility, sources, and misinformation probability."
      }
    ];

    setMessages(newMessages);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <section className="py-16 border-b border-gray-800">

        <div className="container mx-auto px-4 text-center">

          <h1 className="text-4xl font-bold mb-4">
            AI News Analyst
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Ask questions about any news article. Our AI analyzes credibility,
            detects bias, verifies sources, and identifies misinformation.
          </p>

        </div>

      </section>


      {/* CHAT AREA */}

      <section className="py-16">

        <div className="container mx-auto px-4 max-w-3xl">

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-6 h-[500px] flex flex-col">

            {/* CHAT MESSAGES */}

            <div className="flex-1 overflow-y-auto space-y-4 mb-4">

              {messages.length === 0 && (
                <p className="text-gray-500 text-center mt-10">
                  Start a conversation by asking about a news article.
                </p>
              )}

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-600 ml-auto"
                      : "bg-gray-800"
                  }`}
                >
                  {msg.text}
                </div>

              ))}

            </div>


            {/* INPUT AREA */}

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Ask about any news article..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={handleSend}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
        © 2024 VeritasAI AI News Analyst
      </footer>

    </div>
  );
}