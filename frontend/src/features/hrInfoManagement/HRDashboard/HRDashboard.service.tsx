import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';

interface GetHRInformationListPoprs{
    searchTerm: string | null;
    filterName : string | null;
};

export const HRDashboardService = {

    // get dashboard summary 
    getHRDashboardCount : async () => {
        try {
            const response = await api.get(ApiRoutes.hrmanagement.dashboardSummary);
            return response?.data?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    },

    // get hr information list
    getHRInformationList : async (values:GetHRInformationListPoprs) => {
        try {
            const response = await api.post(ApiRoutes.hrmanagement.hrInfoList, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    }
}