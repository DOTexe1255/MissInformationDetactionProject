import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {

  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_API_URL;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    const updatedMessages = [...messages, { text: userMessage, type: "user" }];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "News Fact-Checker"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a fact-checking AI...`
            },
            { role: "user", content: userMessage }
          ]
        })
      });

      const data = await response.json();

      let reply = "Error occurred";

      if (data.choices && data.choices[0]) {
        reply = data.choices[0].message.content;
      }

      setMessages([
        ...updatedMessages,
        { text: reply, type: "bot" }
      ]);

    } catch (error) {
      setMessages([
        ...updatedMessages,
        { text: "❌ Error connecting to AI service.", type: "bot" }
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-76px)] bg-black text-white flex flex-col">

      {/* HEADER */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          🤖
        </div>
        <div>
          <h1 className="font-semibold">AI News Analyst</h1>
          <p className="text-xs text-green-400">● Online</p>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">

          {messages.length === 0 && (
            <div className="text-center mt-20 text-gray-500">
              <h2 className="text-xl mb-2">Start analyzing news</h2>
              <p className="text-sm">Paste any article or headline</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`px-4 py-3 rounded-xl max-w-[70%] text-sm leading-relaxed ${msg.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-800 text-gray-200"
                  }`}
              >
                {msg.text}
                <div className="text-xs mt-1 opacity-60">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-neutral-800 px-4 py-3 rounded-xl flex gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="border-t border-gray-800 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">

          <input
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste news to verify..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-neutral-900 border border-gray-700 rounded-lg outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            {isLoading ? "..." : "Send"}
          </button>

        </div>
      </div>

    </div>
  );
};

export default Chatbot;