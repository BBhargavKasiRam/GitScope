import React, { useState } from 'react';
import { Search, Loader2, Settings, HelpCircle, Grid } from 'lucide-react';

const Navbar = ({ onAnalyze, loading }) => {
  const [username, setUsername] = useState("");

  // Inside your Navbar.jsx, update the handleSubmit:

const handleSubmit = (e) => {
  e.preventDefault();
  
  let finalValue = username.trim();

  // If the user pasted a URL, extract the username
  // Matches: https://github.com/username or github.com/username
  if (finalValue.includes('github.com/')) {
    finalValue = finalValue.split('github.com/').pop().split('/')[0];
  }
  
  if (finalValue) {
    onAnalyze(finalValue);
  }
};

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 px-4 py-2 flex items-center justify-between">
      {/* Left: Logo Area */}
      <div className="flex items-center gap-2 min-w-[200px]">
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          <img src="/GitScope.svg" alt="Logo" className="w-8 h-8" />
        </div>
        <span className="text-xl font-medium text-gray-700 tracking-tight">
          Git<span className="text-blue-600 font-bold">Scope</span>
        </span>
      </div>

      {/* Center: Google-style Search Bar */}
      <form 
        onSubmit={handleSubmit} 
        className="flex-grow max-w-2xl mx-4 group"
      >
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-500 group-focus-within:text-blue-600">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search GitHub username..."
            className="w-full bg-gray-100 border border-transparent rounded-full py-2.5 pl-12 pr-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-md transition-all text-gray-800"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Analyze"}
          </button>
        </div>
      </form>

      {/* Right: Icons Area (Gmail Style) */}
      <div className="flex items-center gap-2 min-w-[200px] justify-end">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <HelpCircle size={22} />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Settings size={22} />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full ml-2">
          <Grid size={22} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;