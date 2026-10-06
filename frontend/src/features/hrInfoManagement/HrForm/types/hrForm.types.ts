// Used in HRInfoForm component
export interface HRDetail {
    hrName: string;
    hrEmail: string;
    hrMobile: string;
    hrLinkedInProfile: string;
}

export interface FormData { 
    companyName: string; 
    companyWebsite: string; 
    positionName: string;
    hrDetails: HRDetail[];
}

// Used in HRInfoForm component
export type HRDetailErrors = Partial<Record<keyof HRDetail, string>>;
export type FormErrors = Partial<Record<"companyName" | "companyWebsite" | "positionName", string>> & {
    hrDetails?: HRDetailErrors[];
};

// Used in HRInfoForm component
export interface PositionListResult { 
    id: number, 
    position_name: string
};

// Service file
export interface storeHRInfoProps {
    companyName: string; 
    companyWebsite: string; 
    positionName: string;
    hrDetails: HRDetail[];
};

// Service file
export interface positionListProps {
positionName : string | null;
};