import { type Job } from "../types/EmailJobs.types";
import { StatCard } from "../../CommonComponent/StatCard";
import { StatusBadge } from "./StatusBadge.component";

interface Props {
  job: Job;
  onCancel: () => void;
}

const hrList = [
  { name: "Divy Gandhi", status: "completed", company: "D.com", email: "divy@gmail.com" },
  { name: "John Smith", status: "failed", company: "TechSoft", email: "john@techsoft.com" },
  { name: "Anna Lee", status: "pending", company: "StartupX", email: "anna@startupx.com" },
  { name: "Divy Gandhi", status: "completed", company: "D.com", email: "divy@gmail.com" },
  { name: "John Smith", status: "failed", company: "TechSoft", email: "john@techsoft.com" },
  { name: "Anna Lee", status: "pending", company: "StartupX", email: "anna@startupx.com" },
  { name: "Divy Gandhi", status: "completed", company: "D.com", email: "divy@gmail.com" },
  { name: "John Smith", status: "failed", company: "TechSoft", email: "john@techsoft.com" },
  { name: "Anna Lee", status: "pending", company: "StartupX", email: "anna@startupx.com" },
];

export const JobDetails: React.FC<Props> = ({ job, onCancel }) => {

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col h-[calc(100vh-120px)] sticky top-8">

      {/* Header */}
      <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-slate-800 tracking-tight">Job Details</h2>
          <p className="text-xs text-slate-500 font-mono">ID: {job.jobid}</p>
        </div>

        <button
          onClick={onCancel}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition"
        >
          ✕
        </button>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-slate-100 bg-white">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Success" count="70" />
          <StatCard label="Failed" count="10" />
        </div>
      </div>

      {/* HR List */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">

        <p className="text-xs font-bold text-slate-400 uppercase mb-3">
          Recipients ({hrList.length})
        </p>

        <div className="space-y-2">

          {hrList.length > 0 ? (
            hrList.map((hr, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-lg p-3 hover:shadow-sm hover:border-blue-200 transition bg-white"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {hr.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {hr.company}
                    </p>

                    <p className="text-xs text-blue-600">
                      {hr.email}
                    </p>
                  </div>

                  <StatusBadge status={hr.status as any} />

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 text-sm italic">
              No recipients found
            </div>
          )}

        </div>
      </div>
    </div>
  );
};