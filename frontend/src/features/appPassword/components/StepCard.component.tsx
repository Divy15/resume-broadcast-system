import React from 'react';

interface StepProps {
  id: number;
  title: string;
  desc: string;
  link?: string;
}

const StepCard: React.FC<StepProps> = ({ id, title, desc, link }) => {
  return (
    <div className="relative p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-sm">
      {/* Step Number Bubble */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
        {id}
      </div>
      
      <div className="ml-2">
        <h3 className="font-bold text-slate-800 mb-1 underline decoration-blue-200 decoration-2 underline-offset-4">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {desc}
        </p>
        
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 font-semibold hover:text-blue-800 mt-2 flex items-center gap-1"
          >
            Open Google Security Settings ↗
          </a>
        )}
      </div>
    </div>
  );
};

export default StepCard;