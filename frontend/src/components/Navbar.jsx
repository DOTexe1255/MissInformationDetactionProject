import { Link } from "react-router-dom";
import { navigationData } from "../data/data";
import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#1a365d] text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <i className="fas fa-check-double"></i>
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Veritas<span className="text-blue-500">AI</span>
              </h1>
              <p className="text-xs text-gray-300">
                Truth Verification Platform
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navigationData.map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            ))}

          </div>
        </div>
      </nav>
    </header>
  );
}