import React, { useState } from 'react';
import axios from 'axios';
import { Terminal, Github } from 'lucide-react'; // Added Github icon
import Navbar from './components/Navbar';
import AnalysisResults from './components/AnalysisResults';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state

  const handleAnalyze = async (input) => {
    setLoading(true);
    setData(null);
    setError(null);

    // Final safety check: extract username if it's still a URL
    const username = input.split('/').filter(Boolean).pop();

    try {
      const res = await axios.post(
        'https://gitscope-a5rp.onrender.com/api/analyze', 
        { username }, 
        { timeout: 60000 }
      );
      setData(res.data);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError("We couldn't find that user or the server is busy. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      <Navbar onAnalyze={handleAnalyze} loading={loading} />

      <main className="relative max-w-6xl mx-auto px-6 pt-32 pb-12">
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <Github className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600" size={24} />
            </div>
            <p className="text-gray-500 font-medium animate-pulse">Scanning repositories...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-center mb-8">
            {error}
          </div>
        )}

        {/* Landing State */}
        {!data && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              v2.0 powered by Gemini
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight">
              Code with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Impact.</span>
            </h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed">
              Paste a GitHub profile URL to analyze documentation quality, 
              contribution consistency, and recruiter-ready metrics.
            </p>
          </div>
        )}

        {/* Results State */}
        {data && <AnalysisResults data={data} />}
      </main>
    </div>
  );
}

export default App;