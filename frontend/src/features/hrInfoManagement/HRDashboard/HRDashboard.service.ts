import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';

interface GetHRInformationListPoprs{
    searchTerm: string | null;
    filterName : string | null;
};

export const HRDashboardService = {

    // get dashboard summary 
    getHRDashboardCount : async () => {
        const response = await api.get(ApiRoutes.hrmanagement.dashboardSummary);
        return response?.data?.data;
    },

    // get hr information list
    getHRInformationList : async (values:GetHRInformationListPoprs) => {
        const response = await api.post(ApiRoutes.hrmanagement.hrInfoList, values);
        return response?.data;
    }
}