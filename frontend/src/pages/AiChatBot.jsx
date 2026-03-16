import React, { useState } from "react";

const Chatbot = () => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_KEY = import.meta.env.VITE_GOOGLE_API_URL;

  const sendMessage = async () => {

    const userMessage = input.trim();
    if (!userMessage) return;

    const updatedMessages = [...messages, { text: userMessage, type: "user" }];
    setMessages(updatedMessages);
    setInput("");

    setMessages([...updatedMessages, { text: "Thinking...", type: "bot" }]);

    try {

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "AI Chatbot"
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini",
            messages: [
              { role: "user", content: userMessage },
              {
                role: "system",
                content: `
You are a fact-checking AI for a news verification platform.
Analyze the given news and determine if it is:
- Likely Real
- Likely Fake
- Uncertain

Also provide:
1. Reasoning
2. Possible misinformation signs
3. Confidence score (0-100)
`
              }
            ]
          })
        }
      );

      const data = await response.json();

      let reply = "API Error";

      if (data.choices && data.choices[0]) {
        reply = data.choices[0].message.content;
      }

      setMessages([
        ...updatedMessages,
        { text: userMessage, type: "user" },
        { text: reply, type: "bot" }
      ]);

    } catch (error) {

      setMessages([
        ...updatedMessages,
        { text: "Error: " + error.message, type: "bot" }
      ]);

    }

  };

  return (

    <div className="w-full h-[calc(100vh-80px)] flex justify-center items-start bg-slate-900 p-6">

      <div className="w-full max-w-6xl h-full bg-slate-800 rounded-xl shadow-lg flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold">
          AI Chatbot
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`px-4 py-3 rounded-lg max-w-[65%] text-sm md:text-base break-words
              ${msg.type === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-slate-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>

          ))}

        </div>

        {/* Input */}
        <div className="flex border-t border-slate-600 bg-slate-800">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
            placeholder="Type message..."
            className="flex-1 p-4 bg-transparent text-gray-200 placeholder-gray-400 outline-none"
          />

          <button
            onClick={sendMessage}
            className="px-6 bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );

};

export default Chatbot;