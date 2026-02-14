import React, { useState } from 'react';
import { Search, Loader2, Settings, HelpCircle, Grid, Menu } from 'lucide-react';

const Navbar = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onAnalyze(url);
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 px-3 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Logo Area - Shrunk on mobile to save space */}
        <div className="flex items-center gap-1 md:gap-2 min-w-fit">
          <div className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <img src="/GitScope.svg" alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <span className="text-lg md:text-xl font-medium text-gray-700 tracking-tight whitespace-nowrap">
            Git<span className="text-blue-600 font-bold">Scope</span>
          </span>
        </div>

        {/* Center: Search Bar - Flex-grow allows it to take all available middle space */}
        <form 
          onSubmit={handleSubmit} 
          className="flex-grow max-w-2xl mx-1 md:mx-4 group"
        >
          <div className="relative flex items-center">
            <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-600 hidden sm:block">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="GitHub URL..."
              className="w-full bg-gray-100 border border-transparent rounded-full py-2 pl-4 sm:pl-10 pr-24 md:pr-28 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:shadow-sm transition-all text-sm md:text-base text-gray-800"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-1 md:right-1.5 bg-blue-600 text-white px-3 md:px-5 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 min-w-[70px] flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Analyze"}
            </button>
          </div>
        </form>

        {/* Right: Icons Area - Hidden on small mobile devices to prevent crowding */}
        <div className="hidden sm:flex items-center gap-1 md:gap-2 min-w-fit justify-end">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <HelpCircle size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full hidden md:block">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Grid size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;