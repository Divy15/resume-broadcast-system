import app  from '../../api/axiosInstance';
import { ApiRoutes } from '../../api/apiRoutes';
import {type StoreUserDataProps} from './types/index.ts';

export const storeUserData = async (value: StoreUserDataProps) => {
    const response = await app.post(ApiRoutes.auth.storeUserData, value);
    return response?.data;
};