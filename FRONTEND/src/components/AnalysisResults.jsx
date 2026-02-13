import React from 'react';
import { Award, CheckCircle2, Star, BookOpen } from 'lucide-react';

const AnalysisResults = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">

      {/* LEFT: Score & Stats */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2rem] text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <Award size={80} />
          </div>

          <img
            src={data.profile.avatar}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-800 ring-2 ring-blue-500"
            alt="avatar"
          />

          <h2 className="text-2xl font-bold text-white">
            {data.profile.name || "Developer"}
          </h2>

          <p className="text-slate-400 text-sm mb-8 line-clamp-2">
            {data.profile.bio}
          </p>

          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-7xl font-black text-blue-500 tracking-tighter leading-none">
              {data.score}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-slate-500">
              Hireability Score
            </span>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <Star className="text-yellow-500 mb-2" size={20} />
            <p className="text-2xl font-bold text-white">
              {data.rawStats.stars || 0}
            </p>
            <p className="text-xs text-slate-500 uppercase">
              Total Stars
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <BookOpen className="text-blue-500 mb-2" size={20} />
            <p className="text-2xl font-bold text-white">
              {data.rawStats.repos}
            </p>
            <p className="text-xs text-slate-500 uppercase">
              Repositories
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: AI Feedback */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-8 h-full shadow-2xl">

          <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <CheckCircle2 className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">
              Recruiter Insights & Improvements
            </h3>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <div className="text-slate-100 leading-relaxed whitespace-pre-wrap text-base font-medium">
              {data.aiFeedback}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AnalysisResults;
