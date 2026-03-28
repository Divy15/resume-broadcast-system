import app  from '../../api/axiosInstance';
import { ApiRoutes } from '../../api/apiRoutes';
import type { GetCompanyRegistrationBarChartProps, GetHrRegistrationBarChartProps } from './types';

export const getHRRegistrationBarChartData = async(value: GetHrRegistrationBarChartProps) => {
    try {
        const response = await app.post(ApiRoutes.dashboardConfig.hrRegistrationBarChart, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}

export const getCompanyRegistrationBarChartData = async(value: GetCompanyRegistrationBarChartProps) => {
    try {
        const response = await app.post(ApiRoutes.dashboardConfig.companyRegistrationBarChart, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}

export const getTotalCounts = async() => {
    try {
        const response = await app.get(ApiRoutes.dashboardConfig.totalCounts);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}