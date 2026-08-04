import { type JobInfoData, type Job } from "../types/EmailJobs.types";
import { StatusBadge } from "./StatusBadge.component";
import { useMemo } from "react";

interface Props {
  job: Job;
  onCancel: () => void;
  jobInfo: JobInfoData[];
  isPolling?: boolean;
}

export const JobDetails: React.FC<Props> = ({
  job,
  onCancel,
  jobInfo,
  isPolling = false,
}) => {
  const stats = useMemo(() => {
    const completed = jobInfo.filter((i) => i.status === "completed").length;
    const failed = jobInfo.filter((i) => i.status !== "completed").length;
    return { completed, failed, total: jobInfo.length };
  }, [jobInfo]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-140px)] sticky top-8 overflow-hidden font-sans">
      {/* Header */}
      <div className="px-8 py-6 flex justify-between items-start bg-linear-to-b from-slate-50 to-white">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Job Review
            </h2>

            {/* Spinner indicator when polling is active */}
            {isPolling && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold animate-pulse border border-blue-100">
                <svg
                  className="animate-spin h-3.5 w-3.5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Syncing (15s)
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Job ID: <span className="text-blue-600">#{job.jobid}</span>
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Status Cards */}
      <div className="px-8 pb-6 grid grid-cols-3 gap-5">
        <StatusCard
          label="Total"
          count={stats.total}
          bg="bg-slate-900"
          text="text-white"
        />
        <StatusCard
          label="Completed"
          count={stats.completed}
          bg="bg-emerald-50"
          text="text-emerald-700"
          border="border-emerald-100"
        />
        <StatusCard
          label="Pending"
          count={stats.failed}
          bg="bg-rose-50"
          text="text-rose-700"
          border="border-rose-100"
        />
      </div>

      {/* HR Grid */}
      <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
          {jobInfo.map((hr, i) => (
            <div
              key={i}
              className="group flex flex-col p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 blur-2xl ${
                  hr.status === "completed" ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />

              <div className="flex justify-between items-start mb-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                  {hr?.hr_name?.charAt(0)}
                </div>
                <StatusBadge status={hr?.status as any} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Company name: {hr?.company}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500 font-medium">
                  <svg
                    className="w-3.5 h-3.5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Sent: {formatToIST(hr?.send_at)}</span>
                </div>
                <p className="text-sm text-slate-500 pt-1 border-t border-slate-50 mt-2 italic font-medium">
                  {hr?.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({
  label,
  count,
  bg,
  text,
  border = "border-transparent",
}: any) => (
  <div
    className={`${bg} ${text} ${border} border p-4 rounded-2xl flex flex-col shadow-sm`}
  >
    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
      {label}
    </span>
    <span className="text-2xl font-black leading-none mt-1">{count}</span>
  </div>
);

const formatToIST = (dateString: string) => {
  if (!dateString) return "Pending";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};