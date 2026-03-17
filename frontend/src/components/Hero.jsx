import React from "react";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="bg-[#1a365d] text-white py-20">

      <div className="container mx-auto px-4 text-center">

        <h2 className="text-5xl font-bold mb-6">
          Combat Misinformation with
          <span className="text-blue-500"> AI-Powered </span>
          Verification
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Professional platform for detecting fake news, AI-generated
          content, and deepfake videos using advanced ML algorithms.
        </p>

        <div className="flex justify-center gap-4">

          <Link to="/FactCheck" className="px-8 py-3 bg-blue-600 rounded-lg">
            Start Analysis
          </Link>

          <button className="px-8 py-3 bg-white/10 rounded-lg">
            View Documentation
          </button>

        </div>

      </div>
    </section>
  );
}