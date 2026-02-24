import React, { useEffect, useState } from 'react';
import { HRDashboardService } from './HRDashboard.service';
import { HrInformationList } from './HRInformationList.component';

// Define types for your filters for better TS support
type FilterType = 'name' | 'last_email' | 'no_email' | '';

interface StatsCardProps {
  label: string;
  count: number | string | undefined;
}

interface summaryResponseDataProps{
  total_hr : string | number,
  total_company : string | number
};

interface HRInformationResponseList{
  company_name : string,
  hr_name : string,
  id : number,
  is_applied : boolean | null,
  is_verified : boolean | null
};

// Reusable sub-component for the stats
const StatCard: React.FC<StatsCardProps> = ({ label, count }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
    <div className="flex items-center h-full justify-start">
    <p className="text-3xl font-bold text-indigo-600 mt-1">+{count}</p>
    </div>
  </div>
);

export const HRFilterComp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('');
  const [summaryData, setSummaryData] = useState<Array<summaryResponseDataProps | undefined>>([]);
  const [hrInfoList, setHRInfoList] = useState<Array<HRInformationResponseList>>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await HRDashboardService.getHRDashboardCount();
      setSummaryData(response);
    };

    fetch();
  }, [])

  useEffect(() => {
    const fetchHRInfoList = async() => {
      const data = {filtername : searchTerm};
      const response = await HRDashboardService.getHRInformationList(data);
      console.log('HR list info:', response);
      if(response?.data?.length !== 0){
      setHRInfoList(response?.data)
      };
    };

    fetchHRInfoList();
  }, [searchTerm, filter]);

  return (
    <div className="w-full bg-slate-50">
      <div className="mx-auto space-y-6">
        
        {/* Counter Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Registered Company" count={summaryData[0]?.total_company} />
          <StatCard label="Total Registered HR" count={summaryData[0]?.total_hr} />
          
          {/* Action/Search Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center space-y-3">
            <div className="relative">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search HR or Company..."
                className="w-full pl-3 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>
            
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">All Records</option>
              <option value="name">Filter by HR Name</option>
              <option value="last_email">Last Sent Email</option>
              <option value="no_email">Email Not Sent</option>
            </select>
          </div>
        </div>

        {/* This is where your HR Table/List would go */}
        <div className="bg-white rounded-xl border border-slate-200 flex text-slate-400 italic">
          <HrInformationList 
          dataList = {hrInfoList}/>
        </div>
      </div>
    </div>
  );
};