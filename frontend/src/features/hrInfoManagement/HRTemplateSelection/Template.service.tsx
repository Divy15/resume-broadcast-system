import {ApiRoutes} from "../../../api/apiRoutes";
import app from "../../../api/axiosInstance";
import {type positionListProps} from "../HRTemplateSelection/types/hrTemplate.types"

export const getTemplateList = async () => {
    try {
        const response = await app.get(ApiRoutes.hrmanagement.templateList);
        return response?.data; // Assuming the API returns the list in the 'data' field
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};

export const getSelectedHRInfoList = async (hrIds: number[]) => {
    try {
        const response = await app.post(ApiRoutes.hrmanagement.selectedHRInfoList,{hrIds});
        return response?.data; // Assuming the API returns the list in the 'data' field
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};

export const getPositionList = async (values: positionListProps) => {
    try {
        const response = await app.post(ApiRoutes.hrmanagement.positionList, values);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}

export const storeTemplateInfo = async (value: any) => {
    try {
        const response = await app.post(ApiRoutes.hrmanagement.storeTemplateSelection, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}