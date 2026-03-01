import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';
import { type storeHRInfoProprs, type positionListProps } from './types/hrForm.types'

export const HRFormService = {

    // store HR Information
    storeHRInfo : async(values: storeHRInfoProprs) => {
        const response = await api.post(ApiRoutes.hrmanagement.storeHRInfo, values);
        return response?.data;
    },


    // position list filtered or non filtered 
    positionList : async(values: positionListProps) => {
        const response = await api.post(ApiRoutes.hrmanagement.positionList, values);
        return response?.data;
    },
}