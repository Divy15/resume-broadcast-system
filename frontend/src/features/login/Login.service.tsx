import app  from '../../api/axiosInstance';
import { ApiRoutes } from '../../api/apiRoutes';
import type {LoginUserDataProps} from './types/index.ts'

export const loginUserData = async (value: LoginUserDataProps) => {
    try {
        const response = await app.post(ApiRoutes.auth.loginUserData, value);
        return response?.data;
    } catch (error: any) {
        const message = error?.response?.data?.message
                     || 'Something went wrong. Please try again.';
        throw new Error(message);
    }
};