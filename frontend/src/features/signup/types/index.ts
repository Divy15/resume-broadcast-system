export interface StoreUserDataProps{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    dob: string;
};

export type FormDataState = StoreUserDataProps;