import {ApiRoutes} from "../../api/apiRoutes";
import app from "../../api/axiosInstance";
import type { GetJobInfoProps } from "./types/EmailJobs.types";

export const getJobList = async () => {
    try {
        const response = await app.get(ApiRoutes.emailJob.getJobList);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}

export const getJobInfo = async (value : GetJobInfoProps) => {
    try {
        const response = await app.post(ApiRoutes.emailJob.getJobInfo, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}