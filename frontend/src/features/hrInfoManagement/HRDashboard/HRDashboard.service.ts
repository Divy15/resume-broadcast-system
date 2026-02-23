import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';

export const HRDashboardService = {

    // get dashboard summary 
    getHRDashboardCount : async () => {
        const response = await api.get(ApiRoutes.hrmanagement.dashboardSummary);
        return response?.data?.data;
    },


}