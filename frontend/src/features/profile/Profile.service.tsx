import api from '../../api/axiosInstance';
import { ApiRoutes } from '../../api/apiRoutes';
import type { UpdateProfileDetailsProps, UpdateProfilePasswordProps } from './types';

export const getProfileDetails = async() => {
    try {
        const response = await api.get(ApiRoutes.profile.getProfileDetails);
        return response?.data
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};

export const updateProfileDetails = async(value: UpdateProfileDetailsProps) => {
    try {
        const response = await api.post(ApiRoutes.profile.updateProfileDetails, value);
        return response?.data
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};

export const updateProfilePassword = async(value: UpdateProfilePasswordProps) => {
    try {
        const response = await api.post(ApiRoutes.profile.updateProfilePassword, value);
        return response?.data
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};