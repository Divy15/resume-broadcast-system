import React from 'react';

interface StepProps {
  id: number;
  title: string;
  desc: string;
}

const StepCard: React.FC<StepProps> = ({ id, title, desc }) => {
  return (
    <div className="relative p-6 bg-slate-50 border border-slate-200 rounded-xl hover:shadow-md transition-shadow duration-300">
      {/* Step Number Bubble */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
        {id}
      </div>
      
      <h3 className="font-bold text-slate-800 mb-2 mt-2 underline decoration-blue-200 decoration-2 underline-offset-4">
        {title}
      </h3>
      
      <p className="text-sm text-slate-600 leading-relaxed">
        {desc}
      </p>
      
      {/* Optional: Add a "Helpful Link" style for Google Security */}
      {id === 1 && (
        <a 
          href="https://myaccount.google.com/security" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:underline mt-3 block"
        >
          Open Google Security →
        </a>
      )}
    </div>
  );
};

export default StepCard;