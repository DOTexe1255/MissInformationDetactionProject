import React from "react";

export default function Alerts() {
  const alerts = [
    {
      title: "Fake News Detected",
      description: "A misleading political article was flagged by the system.",
      time: "2 hours ago",
      type: "danger"
    },
    {
      title: "AI Generated Image",
      description: "An uploaded image was detected as AI-generated.",
      time: "4 hours ago",
      type: "warning"
    },
    {
      title: "Deepfake Video Found",
      description: "A suspicious video shows signs of deepfake manipulation.",
      time: "6 hours ago",
      type: "danger"
    },
    {
      title: "System Monitoring Active",
      description: "Real-time misinformation monitoring is active.",
      time: "Today",
      type: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* PAGE HEADER */}

      <section className="py-16 border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">

          <h1 className="text-4xl font-bold mb-4">
            Real-Time Alerts
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Monitor misinformation activity across news articles,
            images, and videos. The system automatically alerts
            when suspicious content is detected.
          </p>

        </div>
      </section>


      {/* ALERT LIST */}

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">

          <div className="space-y-6">

            {alerts.map((alert, index) => (

              <div
                key={index}
                className="bg-neutral-900 border border-gray-800 rounded-xl p-6 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-lg font-semibold mb-1">
                    {alert.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {alert.description}
                  </p>

                </div>

                <div className="text-right">

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      alert.type === "danger"
                        ? "bg-red-600"
                        : alert.type === "warning"
                        ? "bg-yellow-500 text-black"
                        : "bg-green-600"
                    }`}
                  >
                    {alert.type.toUpperCase()}
                  </span>

                  <p className="text-gray-500 text-xs mt-2">
                    {alert.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* FOOTER */}

      <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
        © 2024 VeritasAI Monitoring System
      </footer>

    </div>
  );
}