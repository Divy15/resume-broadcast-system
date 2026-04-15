import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';
import type { GetHRInformationListAPIPoprs, GetHRInformationAPIProps, DeleteHRInformationAPIProps, UpdateHRInformationAPIProps } from './types/dashboard.types';



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
    getHRInformationList : async (values:GetHRInformationListAPIPoprs) => {
        try {
            const response = await api.post(ApiRoutes.hrmanagement.hrInfoList, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    },

    // Get hr information 
    getHRInformation : async (values:GetHRInformationAPIProps) => {
        try {
            const response = await api.post(ApiRoutes.hrmanagement.getHRDetails, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    },

    // Update hr information 
    updateHRInformation : async (values:UpdateHRInformationAPIProps) => {
        try {
            const response = await api.post(ApiRoutes.hrmanagement.updateHRDetails, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    },

    // Delete hr details permenentally
    deleteHRInformation : async (values:DeleteHRInformationAPIProps) => {
        try {
            const response = await api.post(ApiRoutes.hrmanagement.deleteHRDetails, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    },
}