export const navigationData = [
  { label: "Dashboard", href: "/", icon: "fas fa-tachometer-alt" },
  { label: "Fact Check", href: "/FactCheck", icon: "fas fa-search" },
  { label: "AI Chat Bot", href: "/AiBot", icon: "fas fa-robot" },
  { label: "AI Img Detection", href: "/ai-image-detection", icon: "fas fa-image" },
  { label: "Deepfake Analysis", href: "/deepfake-analysis", icon: "fas fa-video" },
  { label: "API Docs", href: "/api-docs", icon: "fas fa-code" }
];

export const featuresData = [
  {
    title: "Fake News Detection",
    description:
      "Analyze news articles using Google Fact Check API and our proprietary algorithms to identify misinformation patterns.",
    icon: "fas fa-newspaper",
    color: "bg-blue-100 text-blue-600",
    path: "/FactCheck"
  },

  {
    title: "AI Image Detection",
    description:
      "Detect AI-generated images using advanced computer vision models trained on millions of synthetic and real images.",
    icon: "fas fa-image",
    color: "bg-green-100 text-green-600",
    path: "/ai-image-detection"
  },

  {
    title: "Deepfake Video Analysis",
    description:
      "Identify manipulated videos using temporal analysis and facial recognition algorithms with 98.7% accuracy.",
    icon: "fas fa-film",
    color: "bg-purple-100 text-purple-600",
    path: "/deepfake-analysis"
  },

  {
    title: "AI News Analyst [ Bot ]",
    description:
      "Interactive chatbot that answers questions about news credibility.",
    icon: "fas fa-comments",
    color: "bg-orange-100 text-orange-600",
    path: "/ai-news-analyst"
  },

  {
    title: "Source Verification",
    description:
      "Cross-reference information with trusted databases and verify credibility.",
    icon: "fas fa-check-circle",
    color: "bg-red-100 text-red-600",
    path: "/source-verification"
  },

  {
    title: "Real-time Alerts",
    description:
      "Get instant notifications when misinformation is detected.",
    icon: "fas fa-bell",
    color: "bg-indigo-100 text-indigo-600",
    path: "/alerts"
  }
];


export const analysisStatsData = [
  { label: "Articles Analyzed", value: "2.4M", change: "+12%", trend: "up" },
  { label: "Accuracy Rate", value: "96.8%", change: "+1.2%", trend: "up" },
  { label: "Deepfakes Detected", value: "18,432", change: "+34%", trend: "up" },
  { label: "Response Time", value: "1.2s", change: "-0.3s", trend: "down" }
];

export const recentDetectionsData = [
  { title: "Political News Article", type: "Fake News", confidence: "94%", time: "2 hours ago" },
  { title: "Social Media Image", type: "AI Generated", confidence: "87%", time: "4 hours ago" },
  { title: "News Video Clip", type: "Deepfake", confidence: "96%", time: "6 hours ago" },
  { title: "Health Article", type: "Misleading", confidence: "82%", time: "1 day ago" }
];

export const processStepsData = [
  {
    step: "01",
    title: "Content Submission",
    description: "Upload or paste content for analysis through our interface",
    icon: "fas fa-upload"
  },
  {
    step: "02",
    title: "Multi-model Analysis",
    description: "AI models analyze text, images, and videos simultaneously",
    icon: "fas fa-brain"
  },
  {
    step: "03",
    title: "Source Verification",
    description: "Cross-reference with trusted databases",
    icon: "fas fa-database"
  },
  {
    step: "04",
    title: "Detailed Report",
    description: "Receive analysis with confidence scores",
    icon: "fas fa-chart-bar"
  }
];

export const testimonialsData = [
  {
    name: "Natural Language Processing (NLP)",
    role: "Chatbot Engine",
    content:
      "This module processes user queries and generates intelligent, human-like responses using advanced NLP techniques."
  },
  {
    name: "Convolutional Neural Network (CNN)",
    role: "Image Detection",
    content:
      "CNN models analyze images to identify objects and detect manipulated or synthetic visual content with high accuracy."
  },
  {
    name: "Deepfake Detection Model",
    role: "Media Verification",
    content:
      "This system detects fake videos and images by analyzing facial inconsistencies, pixel-level artifacts, and abnormal patterns."
  }
];