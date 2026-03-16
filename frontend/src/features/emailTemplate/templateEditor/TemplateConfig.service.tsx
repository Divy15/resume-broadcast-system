import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';
import type { GetTemplateInfoProps, storeTemplateProps, UpdateTemplateProps } from './types';

export const storeTemplate = async (value : storeTemplateProps) => {
    const response = await api.post(ApiRoutes.templateConfig.storeTemplateConfig, value);

    return response?.data;
}

export const updateTemplate = async(value: UpdateTemplateProps) => {
    const response = await api.post(ApiRoutes.templateConfig.updateTemplate, value);
    return response?.data;
}

export const getTemplateInfo = async(value: GetTemplateInfoProps) => {
    const response = await api.post(ApiRoutes.templateConfig.getTemplateInfo, value);
    return response?.data;
};