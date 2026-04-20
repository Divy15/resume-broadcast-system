

export interface Company {
  id: string;
  name: string;
  website: string;
  linkedIn?: string;
}

export interface CompanyDataPayload {
    name: string;
    website: string;
    linkedin?: string | null;
}

export interface UpdateCompanyPayload extends CompanyDataPayload {
    company_id: number;
}

export interface CompanyIdPayload {
    company_id: number;
}

export interface FilterCompanyPayload {
    name: string;
}