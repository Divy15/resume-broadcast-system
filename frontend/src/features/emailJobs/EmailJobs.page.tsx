import { JobDetails } from "./components/JobDetails.component";
import { JobsHeader } from "./components/JobsHeader.component";
import { JobsList } from "./components/JobsList.component";
import { StatsCard } from "./components/StatusCard.component";
import { getJobInfo, getJobList } from "./EmailJobs.service";
import { type Job, type JobInfoData } from "./types/EmailJobs.types";
import { useEffect, useState, useCallback, useMemo } from "react";

export const EmailJobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobList, setJobList] = useState<Job[]>([]);
  const [jobInfo, setJobInfo] = useState<Array<JobInfoData>>([]);
  const [isPolling, setIsPolling] = useState<boolean>(false);

  const handleBack = () => {
    setSelectedJob(null);
    fetchJob();
  };

  const fetchJob = async () => {
      try {
        const response = await getJobList();
        setJobList(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

  // Initial fetch for Job List
  useEffect(() => {
    fetchJob();
  }, []);

  // Fetch job info helper
  const fetchJobInfo = useCallback(async (jobId: string | number) => {
    try {
      const response = await getJobInfo({ jobid: jobId });
      setJobInfo(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Determine if all jobs are completed
  const isAllCompleted = useMemo(() => {
    if (!jobInfo || jobInfo.length === 0) return false;
    return jobInfo.every((item) => item.status === "completed");
  }, [jobInfo]);

  // Handle polling interval
  useEffect(() => {
    if (!selectedJob?.jobid) return;

    // Fetch immediately on select
    fetchJobInfo(selectedJob.jobid);

    // Don't setup interval if all jobs are finished
    if (isAllCompleted) {
      setIsPolling(false);
      return;
    }

    setIsPolling(true);

    const intervalId = setInterval(async () => {
      await fetchJobInfo(selectedJob.jobid);
    }, 15000); // 15 Seconds Polling

    return () => {
      clearInterval(intervalId);
      setIsPolling(false);
    };
  }, [selectedJob, isAllCompleted, fetchJobInfo]);

  return (
    <div className="p-6 md:p-12">
      <div className="mx-auto">
        {!selectedJob ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <JobsHeader />
            <StatsCard jobs={jobList} />
            <JobsList jobs={jobList} onSelectJob={setSelectedJob} />
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <JobDetails
              job={selectedJob}
              onCancel={handleBack}
              jobInfo={jobInfo}
              isPolling={isPolling}
            />
          </div>
        )}
      </div>
    </div>
  );
};