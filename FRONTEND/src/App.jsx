import React, { useState } from 'react';
import axios from 'axios';
import { Terminal } from 'lucide-react';
import Navbar from './components/Navbar';
import AnalysisResults from './components/AnalysisResults';



function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleAnalyze = async (inputUrl) => {
    setLoading(true);
    setData(null);

    // 1. Extract username from the URL using Regex
    // This looks for the string after github.com/ and ignores trailing slashes
    const githubUsernameRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\?]+)/;
    const match = inputUrl.match(githubUsernameRegex);
    
    // Fallback: If it's not a URL, assume they just typed the username
    const username = match ? match[1] : inputUrl.trim();

    if (!username) {
      console.error("Invalid GitHub URL or Username");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/analyze`, 
        { username }, // We still send the extracted 'username' to your existing backend
        { timeout: 60000 }
      );
      setData(res.data);
    } catch (err) {
      console.error("Analysis Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      <Navbar onAnalyze={handleAnalyze} loading={loading} />

      {/* Main Content Area - Added pt-24 to clear the fixed navbar */}
      <main className="relative max-w-6xl mx-auto px-6 pt-24 pb-12">
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Terminal className="text-blue-600 mb-4 animate-bounce" size={48} />
            <p className="text-gray-500 font-mono">Initializing scan...</p>
          </div>
        )}

        {!data && !loading && (
          <div className="text-center py-32">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 tracking-tight">
              Code with <span className="text-blue-600 italic">Impact.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
              Analyze repository structure, documentation quality, and consistency using Google-grade heuristics.
            </p>
          </div>
        )}

        {data && <AnalysisResults data={data} />}
      </main>
    </div>
  );
}

export default App;