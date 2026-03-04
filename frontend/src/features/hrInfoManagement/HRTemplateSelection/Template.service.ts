import {ApiRoutes} from "../../../api/apiRoutes";
import app from "../../../api/axiosInstance";
import {type positionListProps} from "../HRTemplateSelection/types/hrTemplate.types"

export const getTemplateList = async () => {
        const response = await app.get(ApiRoutes.hrmanagement.templateList);
        return response?.data; // Assuming the API returns the list in the 'data' field
};

export const getSelectedHRInfoList = async (hrIds: number[]) => {
        const response = await app.post(ApiRoutes.hrmanagement.selectedHRInfoList,{hrIds}
        );
        return response?.data; // Assuming the API returns the list in the 'data' field
};

export const getPositionList = async (values: positionListProps) => {
        const response = await app.post(ApiRoutes.hrmanagement.positionList, values);
        return response?.data;
}

export const storeTemplateInfo = async (value: any) => {
        const response = await app.post(ApiRoutes.hrmanagement.storeTemplateSelection, value);
        return response?.data;
}