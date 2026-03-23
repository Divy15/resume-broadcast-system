import api from '../../../api/axiosInstance';
import { ApiRoutes } from '../../../api/apiRoutes';
import { type storeHRInfoProps, type positionListProps } from './types/hrForm.types'

export const HRFormService = {

    // store HR Information
    storeHRInfo : async(values: storeHRInfoProps) => {
        try {
            const response = await api.post(ApiRoutes.hrmanagement.storeHRInfo, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    },


    // position list filtered or non filtered 
    positionList : async(values: positionListProps) => {
        try {
            const response = await api.post(ApiRoutes.hrmanagement.positionList, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    },
}