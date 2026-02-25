import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';

interface storeHRInfoProprs {
companyName: string; 
companyWebsite: string; 
hrName: string; 
hrEmail: string; 
hrMobile: string; 
positionName: string;
};

interface positionListProps {
positionName : string | null;
};

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