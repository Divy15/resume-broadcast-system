import app  from '../../api/axiosInstance';
import { ApiRoutes } from '../../api/apiRoutes';
import type { StoreConfigProps } from './types';

export const storeConfig = async(value: StoreConfigProps) => {
    try {
        const response = await app.post(ApiRoutes.appPasswordConfig.storeConfig, value);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
};

export const getConfig = async() => {
    try {
        const response = await app.get(ApiRoutes.appPasswordConfig.getConfig);
        return response?.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
}