

export interface storeTemplateFormData{
    name: string;
    subject: string;
    body: string
}

export type storeTemplateProps = storeTemplateFormData;

export interface UpdateTemplateProps{
    templateid: number;
    template_subject : string, 
    template_name : string, 
    template_body : string
}

export interface GetTemplateInfoProps{
    templateid : number;
}