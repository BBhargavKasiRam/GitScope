import React, { useState } from 'react';
import axios from 'axios';
import { Search, Loader2, Github, Terminal } from 'lucide-react';
import AnalysisResults from './components/AnalysisResults';

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    setData(null);
    try {
      const res = await axios.post('http://localhost:5000/api/analyze', { username });
      setData(res.data);
    } catch (err) {
      alert("Analysis failed. Is your backend running on port 5000?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Github size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">GIT<span className="text-blue-500">SCOPE</span></h1>
          </div>

          <form onSubmit={handleAnalyze} className="flex w-full md:w-auto gap-2">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="GitHub Username..." 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Analyze"}
            </button>
          </form>
        </header>

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