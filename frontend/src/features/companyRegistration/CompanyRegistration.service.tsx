import api from '../../api/axiosInstance.ts';
import { ApiRoutes } from '../../api/apiRoutes';
import type {CompanyDataPayload, UpdateCompanyPayload, CompanyIdPayload, FilterCompanyPayload} from './types/index.ts';

export const CompanyRegistrationService = {

    // Get total registered company count
    getCompanyCount: async () => {
        try {
            const response = await api.get(ApiRoutes.companyRegistration.companyCount);
            return response?.data?.data[0]?.total_count;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to fetch company count.');
        }
    },

    // Get all companies list
    getCompanyList: async () => {
        try {
            const response = await api.get(ApiRoutes.companyRegistration.companyList);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to fetch company list.');
        }
    },

    // Get filtered company list based on name
    getFilteredCompanyList: async (values: FilterCompanyPayload) => {
        try {
            const response = await api.post(ApiRoutes.companyRegistration.filteredCompanyList, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to filter companies.');
        }
    },

    // Store new company data
    storeCompanyData: async (values: CompanyDataPayload) => {
        try {
            const response = await api.post(ApiRoutes.companyRegistration.storeCompanyData, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to register company.');
        }
    },

    // Update existing company data
    updateCompanyData: async (values: UpdateCompanyPayload) => {
        try {
            const response = await api.post(ApiRoutes.companyRegistration.updateCompanyData, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to update company data.');
        }
    },

    // Get specific company details by ID
    getCompanyDataById: async (values: CompanyIdPayload) => {
        try {
            const response = await api.post(ApiRoutes.companyRegistration.selectedCompanyData, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to fetch company details.');
        }
    },

    // Delete company data
    deleteCompanyData: async (values: CompanyIdPayload) => {
        try {
            const response = await api.post(ApiRoutes.companyRegistration.deleteCompanyData, values);
            return response?.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to delete company.');
        }
    }
};