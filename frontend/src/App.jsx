import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import FactCheck from "./pages/FactCheck";
import Chatbot from "./pages/AiChatBot";
import Navbar from "./components/Navbar";
import AiImageDetection from "./pages/AiImageDetection";
import DeepfakeAnalysis from "./pages/DeepfakeAnalysis";
import ApiDocs from "./pages/ApiDocs";
import Alerts from "./pages/Alerts";
import SourceVerification from "./pages/SourceVerification";
import AiNewsAnalyst from "./pages/AiNewsAnalyst";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/FactCheck" element={<FactCheck />} />
      <Route path="/AiBot" element={<Chatbot />} />
      <Route path="/ai-image-detection" element={<AiImageDetection />} />
      <Route path="/deepfake-analysis" element={<DeepfakeAnalysis />} />
      <Route path="/api-docs" element={<ApiDocs />} />
      <Route path="/source-verification" element={<SourceVerification />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/ai-news-analyst" element={<AiNewsAnalyst />} />
    </Routes>
      
    </>
  );
}

export default App;