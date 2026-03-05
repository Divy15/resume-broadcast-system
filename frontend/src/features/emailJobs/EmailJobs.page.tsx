import { JobDetails } from "./components/JobDetails.component";
import { JobsHeader } from "./components/JobsHeader.component"
import { JobsList } from "./components/JobsList.component"
import { StatsCard } from "./components/StatusCard.component";
import {type Job} from "./types/EmailJobs.types";
import { useState } from "react";

// Mock Data
const jobs: Job[] = [
  { jobid: 111, job_event: "Bulk Email Campaign", job_status: "pending", created: new Date().toLocaleDateString() },
  { jobid: 112, job_event: "Bulk Email Campaign", job_status: "completed", created: new Date().toLocaleDateString() },
  { jobid: 113, job_event: "Bulk Email Campaign", job_status: "failed", created: new Date().toLocaleDateString() },
  { jobid: 114, job_event: "Bulk Email Campaign", job_status: "completed", created: new Date().toLocaleDateString() },
  { jobid: 115, job_event: "Bulk Email Campaign", job_status: "completed", created: new Date().toLocaleDateString() },
  { jobid: 116, job_event: "Bulk Email Campaign", job_status: "completed", created: new Date().toLocaleDateString() }
];

export const EmailJobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Function to clear selection (Back/Cancel action)
  const handleBack = () => setSelectedJob(null);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Only show Header and List if NO job is selected */}
        {!selectedJob ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <JobsHeader />
            <StatsCard jobs={jobs} />
            <JobsList jobs={jobs} onSelectJob={setSelectedJob} />
          </div>
        ) : (
          /* Show Details if a job IS selected */
          <div className="animate-in slide-in-from-right-4 duration-300">
            <JobDetails job={selectedJob} onCancel={handleBack} />
          </div>
        )}
        
      </div>
    </div>
  );
};