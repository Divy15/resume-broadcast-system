import {ApiRoutes} from "../../api/apiRoutes";
import app from "../../api/axiosInstance";
import type { GetJobInfoProps } from "./types/EmailJobs.types";

export const getJobList = async () => {
    const response = await app.get(ApiRoutes.emailJob.getJobList);

    return response?.data;
}

export const getJobInfo = async (value : GetJobInfoProps) => {
    const response = await app.post(ApiRoutes.emailJob.getJobInfo, value);

    return response?.data;
}