import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';
import type { GetTemplateInfoProps, storeTemplateProps, UpdateTemplateProps } from './types';

export const storeTemplate = async (value : storeTemplateProps) => {
    try {
        const response = await api.post(ApiRoutes.templateConfig.storeTemplateConfig, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}

export const updateTemplate = async(value: UpdateTemplateProps) => {
    try {
        const response = await api.post(ApiRoutes.templateConfig.updateTemplate, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}

export const getTemplateInfo = async(value: GetTemplateInfoProps) => {
    try {
        const response = await api.post(ApiRoutes.templateConfig.getTemplateInfo, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};