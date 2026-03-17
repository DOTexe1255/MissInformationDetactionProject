import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">

      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-4 gap-8">

          <div>

            <h4 className="text-xl font-bold mb-4">
             VerifAI
            </h4>

            <p className="text-gray-400 text-sm">
              Advanced platform for detecting misinformation
              using artificial intelligence.
            </p>

          </div>

          <div>

            <h5 className="font-semibold mb-4">
              Platform
            </h5>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Dashboard</li>
              <li>API Docs</li>
              <li>Research</li>
            </ul>

          </div>

          <div>

            <h5 className="font-semibold mb-4">
              Solutions
            </h5>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>News Organizations</li>
              <li>Government</li>
              <li>Education</li>
            </ul>

          </div>

          <div>

            <h5 className="font-semibold mb-4">
              Contact
            </h5>

            <p className="text-gray-400 text-sm">
              https://github.com/DOTexe1255
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}