import React from 'react';

const stats = [
  { value: "10,000+", label: "Pitches Sent" },
  { value: "94%",     label: "Average Open Rate" },
  { value: "2x",      label: "More Interviews" },
  { value: "< 5 min", label: "Setup Time" },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-5xl font-black text-white mb-2">{s.value}</p>
              <p className="text-blue-200 font-medium text-sm uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;