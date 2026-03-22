import app  from '../../api/axiosInstance';
import { ApiRoutes } from '../../api/apiRoutes';
import type { StoreConfigProps } from './types';

export const storeConfig = async(value: StoreConfigProps) => {
    const response = await app.post(ApiRoutes.appPasswordConfig.storeConfig, value);

    return response?.data;
};

export const getConfig = async() => {
    const response = await app.get(ApiRoutes.appPasswordConfig.getConfig);

    return response?.data;
}