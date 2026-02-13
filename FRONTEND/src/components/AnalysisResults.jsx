import React from 'react';
import { Star, Book, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AnalysisResults = ({ data }) => {
  // Destructure for cleaner access
  const { profile, score, stats, analysis } = data;

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Grid: Profile & Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img 
              src={profile?.avatar_url || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-blue-50 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 border-4 border-white w-6 h-6 rounded-full"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800">{profile?.name || "GitHub User"}</h3>
          <p className="text-gray-500 text-sm mb-6">@{profile?.login}</p>
          
          <div className="w-full pt-6 border-t border-gray-50">
            <span className="text-5xl font-black text-blue-600 leading-none">
              {score || 0}
            </span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-2">
              Hireability Score
            </p>
          </div>
        </div>

        {/* AI Analysis / Feedback Card (Large) */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="font-bold text-gray-800 text-lg">AI Feedback & Improvements</h4>
          </div>
          
          <div className="text-gray-600 leading-relaxed min-h-[150px]">
            {analysis ? (
              <p className="whitespace-pre-line">{analysis}</p>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
                <Info size={32} className="mb-2 opacity-20" />
                <p>AI temporarily unavailable. Please try again later.</p>
              </div>
            )}
          </div>
          
          {/* Subtle Decorative Gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50/50 to-transparent -mr-16 -mt-16 rounded-full"></div>
        </div>
      </div>

      {/* Bottom Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Star className="text-amber-500" size={20} />} 
          label="Total Stars" 
          value={stats?.totalStars || 0} 
        />
        <StatCard 
          icon={<Book className="text-blue-500" size={20} />} 
          label="Repositories" 
          value={stats?.repos || 0} 
        />
        {/* Add more stat cards as needed */}
      </div>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
    <div className="p-3 bg-gray-50 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-tight">{label}</p>
    </div>
  </div>
);

export default AnalysisResults;