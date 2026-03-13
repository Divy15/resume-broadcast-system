import {type Job} from "../types/EmailJobs.types";

export const StatsCard: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const total = jobs ? jobs.length : 0;
  const completed = jobs ? jobs.filter(j => j.job_status === "COMPLETED").length : 0;
  const failed = jobs ? jobs.filter(j => j.job_status === "ERROR").length : 0;
  const pending = jobs ? jobs.filter(j => j.job_status === "PROCESSING").length : 0;

  const cards = [
    { label: "Total Jobs", value: total },
    { label: "Completed", value: completed },
    { label: "Pending", value: pending },
    { label: "Failed", value: failed }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(card => (
        <div
          key={card.label}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{card.label}</p>
          <div className="flex items-center h-full justify-start">
          <p className="text-3xl font-bold text-indigo-600 mt-1">
            +{card.value}
          </p>
          </div>
        </div>
      ))}
    </div>
  );
};