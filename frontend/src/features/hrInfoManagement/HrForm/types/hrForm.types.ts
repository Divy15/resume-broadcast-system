
// Used in HRInfoForm component
export interface FormData { 
    companyName: string; 
    companyWebsite: string; 
    hrName: string; 
    hrEmail: string; 
    hrMobile: string; 
    positionName: string;
    hrLinkedInProfile: string;
}

// Used in HRInfoForm component
export type FormErrors = Partial<Record<keyof FormData, string>>;

// Used in HRInfoForm component
export interface PositionListResult { 
    id: number, 
    position_name: string
};

// Service file
export interface storeHRInfoProps {
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