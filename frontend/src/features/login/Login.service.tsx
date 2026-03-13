import app  from '../../api/axiosInstance';
import { ApiRoutes } from '../../api/apiRoutes';
import type {LoginUserDataProps} from './types/index.ts'

export const loginUserData = async(value : LoginUserDataProps) => {
    const response = await app.post(ApiRoutes.auth.loginUserData, value);
    return response?.data;
}