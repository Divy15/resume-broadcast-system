
export interface selectedHRInfoList{
    id: number;
    hr_name: string;
    email: string;
    company_name: string;
}

export interface FormData {  
    positionName: string; 
    template : number;
    resume: File | null;
}

export interface PositionListResult { 
    id: number, 
    position_name: string
};

export interface positionListProps {
positionName : string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;