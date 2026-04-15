
// Used in HRFilter component
export type FilterType = 'name' | 'last_email' | 'no_email' | '';

// Used in HRFilter component
export interface summaryResponseDataProps{
  total_hr : string | number,
  total_company : string | number
};

// Used in HRFilter component
export interface HRInformationResponseList{
  company_name : string,
  hr_name : string,
  id : number,
  position_name: string,
  is_applied : boolean | null,
  is_verified : boolean | null
};

// Used in HRFilter component
// Used in HRInformationList component Props interface
export interface HRSortOptions{
  label: string,
  value: string
};

// Used in HRInformationList component
export interface HRInforListProps {
  dataList: HRInformationResponseList[] | [];
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>; 
}

export interface GetHRInformationAPIProps{
  id: number;
}

export interface DeleteHRInformationAPIProps{
  id: number;
}

export interface UpdateHRInformationAPIProps{
  id: number;
  company_name: string;
  hr_name: string;
  email: string;
  mobileno: string;
  company_website: string;
  hr_linkedin_profile_link: string;
}

export interface GetHRInformationListAPIPoprs{
    searchTerm: string | null;
    filterName : string | null;
};

export interface HRInformation {
  id: number; // This is the HR id
  company_name: string;
  hr_name: string;
  email: string;
  mobileno: string;
  company_website: string;
  position_id: number;
  position_name?: string; // Often returned by GET but not sent in UPDATE
  is_applied: boolean;
  is_verified: boolean | null;
  hr_linkedin_profile_link: string;
}