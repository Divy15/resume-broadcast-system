import {ApiRoutes} from "../../../api/apiRoutes";
import app from "../../../api/axiosInstance";

export const getTemplateList = async () => {
        const response = await app.get(ApiRoutes.hrmanagement.templateList);
        return response?.data; // Assuming the API returns the list in the 'data' field
};

export const getSelectedHRInfoList = async (hrIds: number[]) => {
        const response = await app.post(ApiRoutes.hrmanagement.selectedHRInfoList,{hrIds}
        );
        return response?.data; // Assuming the API returns the list in the 'data' field
};