import { JobDetails } from "./components/JobDetails.component";
import { JobsHeader } from "./components/JobsHeader.component"
import { JobsList } from "./components/JobsList.component"
import { StatsCard } from "./components/StatusCard.component";
import { getJobInfo, getJobList } from "./EmailJobs.service";
import {type Job, type JobInfoData} from "./types/EmailJobs.types";
import { useEffect, useState } from "react";

export const EmailJobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobList, setJobList] = useState<Job[]>([]);
  const [jobInfo, setJobInfo] = useState<Array<JobInfoData> | []>([]);

  // Function to clear selection (Back/Cancel action)
  const handleBack = () => setSelectedJob(null);

  // Get Job list
  useEffect(() => {

    const fetchJob = async () => {
      try {
        const response = await getJobList();
        setJobList(response?.data);
      } catch (error) { console.error(error); }
    };

    const fetchJobInfo = async () => {
      try {
        const response = await getJobInfo({jobid : selectedJob?.jobid});
        setJobInfo(response?.data);
      } catch (error) { console.error(error); }
    };
    
    fetchJob();

    if(selectedJob?.jobid){
    fetchJobInfo();
    };
  }, [selectedJob]);

  return (
    <div className="p-6 md:p-12 min-h-screen">
      <div className="mx-auto">
        
        {/* Only show Header and List if NO job is selected */}
        {!selectedJob ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <JobsHeader />
            <StatsCard jobs={jobList} />
            <JobsList jobs={jobList} onSelectJob={setSelectedJob} />
          </div>
        ) : (
          /* Show Details if a job IS selected */
          <div className="animate-in slide-in-from-right-4 duration-300">
            <JobDetails job={selectedJob} onCancel={handleBack} jobInfo= {jobInfo}/>
          </div>
        )}
        
      </div>
    </div>
  );
};