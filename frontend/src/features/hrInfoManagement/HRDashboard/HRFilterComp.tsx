import React, { useEffect, useState } from 'react';
import { HRDashboardService } from './HRDashboard.service';
import { HrInformationList } from './HRInformationList.component';
import { useNavigate } from 'react-router-dom';

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
  position_name: string,
  is_applied : boolean | null,
  is_verified : boolean | null
};

interface HRSortOptions{
  label: string,
  value: string
};

// Filter Array For HR list 
const hrSortOptions: Array<HRSortOptions> = [
  {label: 'All Records', value: 'all_records'},
  { label: 'HR Name (A–Z)', value: 'hr_asc' },
  { label: 'HR Name (Z–A)', value: 'hr_desc' },
  { label: 'Not Applied Yet', value: 'not_applied_yet' },
];

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
  const [summaryData, setSummaryData] = useState<Array<summaryResponseDataProps | null>>([{
    total_company : 0,
    total_hr : 0
  }]);
  const [hrInfoList, setHRInfoList] = useState<Array<HRInformationResponseList> | []>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleBulkSend = () => {
    console.log("Sending mail to IDs:", selectedIds);
    navigate('/template/selection', {state : {selectedIds : selectedIds}});
  };

  useEffect(() => {
    setSelectedIds([]);
  }, [hrInfoList]);

  useEffect(() => {
    const fetch = async () => {
      const response = await HRDashboardService.getHRDashboardCount();
      if(response?.length !== 0){
       return setSummaryData(response);
      };
      setSummaryData([
        {
          total_company : 0,
          total_hr : 0
        }
      ])
    };

    fetch();
  }, [])

  useEffect(() => {
    const fetchHRInfoList = async() => {
      const data = {searchTerm : searchTerm, filterName: filter};
      const response = await HRDashboardService.getHRInformationList(data);
      if(response?.data?.length !== 0){
      return setHRInfoList(response?.data)
      };
    };

    fetchHRInfoList();
  }, [searchTerm, filter]);

  return (
    <div className="w-full bg-slate-50">
      <div className="mx-auto space-y-6">
        
        {/* Counter Cards Section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
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
              {hrSortOptions.map((item,index) => (
                <option key={index} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
            <span className="text-indigo-700 font-medium">
              {selectedIds.length} HR{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <button 
              onClick={handleBulkSend}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md"
            >
              Send Mail to Selected
            </button>
          </div>
        )}

        {/* This is where your HR Table/List would go */}
        <div className="bg-white rounded-xl border border-slate-200 flex text-slate-400 italic">
          <HrInformationList 
          dataList = {hrInfoList}
          selectedIds={selectedIds} 
          setSelectedIds={setSelectedIds}/>
        </div>
      </div>
    </div>
  );
};