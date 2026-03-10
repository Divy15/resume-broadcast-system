import React from 'react';
import { UserPlus, Mail, Users, Wand2, Send, ChevronRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Register Yourself",
      description: "Create your professional profile and upload your latest resume in seconds.",
      icon: <UserPlus className="text-blue-600" size={28} />,
      color: "bg-blue-50"
    },
    {
      title: "Connect Gmail",
      description: "Securely link your Gmail account to send pitches directly from your own professional email.",
      icon: <Mail className="text-purple-600" size={28} />,
      color: "bg-purple-50"
    },
    {
      title: "Personalized List",
      description: "Build a curated list of HR managers and recruiters from your target companies.",
      icon: <Users className="text-orange-600" size={28} />,
      color: "bg-orange-50"
    },
    {
      title: "Create Templates",
      description: "Craft dynamic messages using tags like {{hr_name}} for that 'human' touch.",
      icon: <Wand2 className="text-emerald-600" size={28} />,
      color: "bg-emerald-50"
    },
    {
      title: "Broadcast & Track",
      description: "Launch your campaign and monitor opens and replies in real-time.",
      icon: <Send className="text-pink-600" size={28} />,
      color: "bg-pink-50"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Your Path to a New Job</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            PitchHR simplifies the complex outreach process into five simple, automated steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative`}>
                  {step.icon}
                  {/* Step Number Badge */}
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-gray-50 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-sm">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed px-2">
                  {step.description}
                </p>

                {/* Arrow (Desktop Only, hides on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 left-[calc(20%*${index+1}-2%)] text-gray-200">
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA for the section */}
        <div className="mt-20 flex justify-center">
          <div className="bg-gray-50 border border-gray-100 px-6 py-3 rounded-full flex items-center gap-3 text-sm font-medium text-gray-600">
            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            Estimated setup time: Under 5 minutes
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;