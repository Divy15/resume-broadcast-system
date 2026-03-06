
export type JobStatus = "PROCESSING" | "COMPLETED" | "ERROR" | 'completed' | 'failed' | 'invalid_email' | 'retry_pending' | 'smtp_error';

export interface Job {
  jobid: number;
  job_event: string;
  job_status: JobStatus;
  created: string;
}

export type HRJobStatus = 'completed' | 'failed' | 'invalid_email' | 'retry_pending' | 'smtp_error'

export interface HRJob {
  name: string;
  status: HRJobStatus;
  company: string;
  email: string;
}

export interface GetJobInfoProps {
  jobid : number | null | undefined;
}

export interface JobInfoData{
  company: string;
  created_at: string;
  email: string;
  hr_id: number;
  hr_name: string;
  status: HRJobStatus;
}
