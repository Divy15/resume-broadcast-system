import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';
import type { DeleteTemplateInfoProps, GetFilterTemplateListProps } from './types';

export const getFilterTemplateList = async (value: GetFilterTemplateListProps) => {
    try {
        const response = await api.post(ApiRoutes.templateConfig.filterTemplateList, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};

export const getTemplateList = async () => {
    try {
        const response = await api.get(ApiRoutes.templateConfig.templateList);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};

export const deleteTemplate = async(value: DeleteTemplateInfoProps) => {
    try {
        const response = await api.post(ApiRoutes.templateConfig.deleteTemplate, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}
