import {type JobStatus, type HRJobStatus} from "../types/EmailJobs.types";

export const StatusBadge: React.FC<{ status: JobStatus | HRJobStatus }> = ({ status }) => {
  const styles: Record<JobStatus, string> = {
    COMPLETED: "bg-green-100 text-green-700",
    ERROR: "bg-red-100 text-red-700",
    PROCESSING: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    failed : "bg-red-100 text-red-700", 
    invalid_email : "bg-red-100 text-red-700", 
    retry_pending : "bg-red-100 text-red-700", 
    smtp_error : "bg-red-100 text-red-700"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};