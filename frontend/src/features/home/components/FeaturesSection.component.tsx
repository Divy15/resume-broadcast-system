import React from 'react';
import { Zap, BarChart2, Mail, Wand2 } from 'lucide-react';

const features = [
  {
    icon: <Mail className="text-blue-600" size={24} />,
    bg: "bg-blue-50",
    title: "Bulk Gmail Outreach",
    description: "Send hundreds of personalized pitches directly from your Gmail — no third-party tools needed.",
  },
  {
    icon: <Wand2 className="text-purple-600" size={24} />,
    bg: "bg-purple-50",
    title: "AI-Powered Templates",
    description: "Let AI craft compelling pitch emails tailored to each HR manager's company and role.",
  },
  {
    icon: <BarChart2 className="text-emerald-600" size={24} />,
    bg: "bg-emerald-50",
    title: "Real-Time Tracking",
    description: "Know exactly who opened your email, when they clicked, and who's ready to reply.",
  },
  {
    icon: <Zap className="text-orange-500" size={24} />,
    bg: "bg-orange-50",
    title: "One-Click Automation",
    description: "Schedule follow-ups automatically so no lead ever goes cold without your input.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Everything You Need to Land the Job</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            PitchHR gives you the tools that top candidates use to stand out from the pile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;