import {type Job} from "../types/EmailJobs.types";
import { StatusBadge } from "./StatusBadge.component";

interface Props {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  activeJobId?: number;
}

export const JobsList: React.FC<Props> = ({ jobs, onSelectJob, activeJobId }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">#</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Job ID</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Job Event</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {jobs.map((job, index) => {
              const isActive = activeJobId === job.jobid;
              
              return (
                <tr 
                  key={job.jobid} 
                  onClick={() => onSelectJob(job)}
                  className={`
                    group cursor-pointer transition-all duration-200
                    ${isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'}
                  `}
                >
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold ${isActive ? 'text-blue-600' : 'text-slate-700'}`}>
                    {job.jobid}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="font-medium">{job.job_event}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={job.job_status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 italic">
                    {job.created}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};