
// Used in HRInfoForm component
export interface FormData { 
    companyName: string; 
    companyWebsite: string; 
    hrName: string; 
    hrEmail: string; 
    hrMobile: string; 
    positionName: string; }

// Used in HRInfoForm component
export type FormErrors = Partial<Record<keyof FormData, string>>;

// Used in HRInfoForm component
export interface PositionListResult { 
    id: number, 
    position_name: string
};

// Service file
export interface storeHRInfoProprs {
companyName: string; 
companyWebsite: string; 
hrName: string; 
hrEmail: string; 
hrMobile: string; 
positionName: string;
};

// Service file
export interface positionListProps {
positionName : string | null;
};