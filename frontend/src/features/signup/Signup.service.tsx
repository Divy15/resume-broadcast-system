import app  from '../../api/axiosInstance';
import { ApiRoutes } from '../../api/apiRoutes';
import {type StoreUserDataProps} from './types/index.ts';

export const storeUserData = async (value: StoreUserDataProps) => {
    try {
        const response = await app.post(ApiRoutes.auth.storeUserData, value);
        return response?.data;
    } catch (error: any) {
        // ✅ Axios wraps non-2xx responses in error.response
        console.log("Full error object:", error?.response?.data);

        const message = error?.response?.data?.message || 'Something went wrong. Please try again.';
        throw new Error(message);
    }
};