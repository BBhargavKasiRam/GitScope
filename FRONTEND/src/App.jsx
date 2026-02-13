import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, Terminal } from 'lucide-react';
import AnalysisResults from './components/AnalysisResults';
import Navbar from './components/Navbar'; // 1. Import Navbar

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. Updated to receive username from Navbar
  const handleAnalyze = async (username) => {
    setLoading(true);
    setData(null);
    try {
      const res = await axios.post('https://gitscope-a5rp.onrender.com/api/analyze', 
        { username }, 
        { timeout: 60000 }
      );
      setData(res.data);
    } catch (err) {
      console.error("FULL ERROR:", err);
      // Note: Don't use res.status here, that's for backend. 
      // Use an alert or a state-based error message for the UI.
      alert("Failed to analyze user. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* 3. Add Navbar here */}
        <Navbar onAnalyze={handleAnalyze} loading={loading} />

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Terminal className="text-blue-500 mb-4" size={48} />
            <p className="text-slate-400 font-mono">Running Recruiter-Heuristics...</p>
          </div>
        )}

        {!data && !loading && (
          <div className="text-center py-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent italic">
              Code with Impact.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Analyze repository structure, documentation quality, and consistency using AI-driven scoring.
            </p>
          </div>
        )}

        {data && <AnalysisResults data={data} />}
      </div>
    </div>
  );
}

export default App;