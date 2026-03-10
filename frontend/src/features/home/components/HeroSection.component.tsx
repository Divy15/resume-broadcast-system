import React from 'react';
import { Send, MousePointer2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white overflow-hidden min-h-screen flex items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-[120px] opacity-20 pointer-events-none">
        <div className="aspect-square h-125 rounded-full bg-linear-to-br from-blue-600 to-cyan-400"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-24 -translate-x-24 blur-[100px] opacity-10 pointer-events-none">
        <div className="aspect-square h-100 rounded-full bg-blue-800"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:text-left lg:flex items-center gap-12">
        
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold animate-fade-in">
            <Sparkles size={16} className="text-blue-600" />
            New: AI-Powered Resume Pitching
          </div>

          <h1 className="text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1]">
            Stop Applying. <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-500">
              Start Pitching.
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            PitchHR is the secret weapon for job seekers. Manage your HR database, 
            automate personalized outreach, and track your success in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
            <button 
              onClick={() => navigate('/signup')}
              className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch Your First Pitch <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* Right Content: Visual Dashboard */}
        <div className="lg:w-1/2 mt-20 lg:mt-0 relative flex justify-center perspective-1000">
          <div className="relative w-full max-w-md">
            {/* Decorative Floating Icon */}
            <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl z-20 animate-bounce hidden md:block">
              <MousePointer2 className="text-blue-600" size={24} />
            </div>

            {/* Main Mock Card */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] p-8 border border-gray-100 transition-all duration-700 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Live Outreach</h3>
                  <p className="text-sm text-gray-400 font-medium">Tracking 14 active pitches</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              </div>

              <div className="space-y-5">
                {[
                  { name: "Google HR", status: "Applied", time: "2m ago", color: "bg-green-100 text-green-700" },
                  { name: "Meta Recruiting", status: "Sent", time: "5m ago", color: "bg-blue-100 text-blue-700" },
                  { name: "Netflix Talent", status: "Not Applied", time: "1h ago", color: "bg-gray-100 text-gray-500" },
                ].map((item, i) => (
                  <div key={i} className="group flex items-center justify-between p-4 bg-gray-50/50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-2xl transition-all cursor-default">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 font-bold border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{item.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;