import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

const Navbar = ({ onAnalyze, loading }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(username);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          {/* Ensure the path to your SVG is correct based on your public folder */}
          <img src="/GitScope.svg" alt="GitScope Logo" className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          Git<span className="text-blue-500">Scope</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
        <div className="relative flex-grow md:w-80">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="GitHub Username..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner text-white"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !username}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 min-w-[100px] flex justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Analyze"}
        </button>
      </form>
    </header>
  );
};

export default Navbar;