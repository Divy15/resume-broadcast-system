import api from '../../../api/axiosInstance';
import { ApiRoutes } from './../../../api/apiRoutes';
import type { DeleteTemplateInfoProps, GetFilterTemplateListProps } from './types';

export const getFilterTemplateList = async (value: GetFilterTemplateListProps) => {
    const response = await api.post(ApiRoutes.templateConfig.filterTemplateList, value);
    return response?.data;
};

export const getTemplateList = async () => {
    const response = await api.get(ApiRoutes.templateConfig.templateList);
    return response?.data;
};

export const deleteTemplate = async(value: DeleteTemplateInfoProps) => {
    const response = await api.post(ApiRoutes.templateConfig.deleteTemplate, value);
    return response?.data;
}
