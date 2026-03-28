

export interface GetHrRegistrationBarChartProps{
    month: string;
    year: number;
    timezone: string;
}

export interface GetCompanyRegistrationBarChartProps{
    month: string;
    year: number;
    timezone: string;
}

export interface DashboardCounts {
  total_hr: number;
  total_company: number;
  total_email_send: number;
}