
export type JobStatus = "pending" | "completed" | "failed";

export interface Job {
  jobid: number;
  job_event: string;
  job_status: JobStatus;
  created: string;
}