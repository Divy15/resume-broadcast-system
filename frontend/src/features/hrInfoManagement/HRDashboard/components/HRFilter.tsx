import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HRDashboardService } from '../HRDashboard.service';
import { HrInformationList } from './HRInformationList';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../../../CommonComponent/StatCard';
import {type FilterType, type summaryResponseDataProps, type HRInformationResponseList, type HRSortOptions} from "../types/dashboard.types";
import { useLoader } from '../../../../context/LoaderContext';


// Filter Array For HR list 
const hrSortOptions: Array<HRSortOptions> = [
  {label: 'All Records', value: 'all_records'},
  { label: 'HR Name (A–Z)', value: 'hr_asc' },
  { label: 'HR Name (Z–A)', value: 'hr_desc' },
  { label: 'Not Applied Yet', value: 'not_applied_yet' },
];

export const HRFilterComp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('');
  const [summaryData, setSummaryData] = useState<Array<summaryResponseDataProps | null>>([{
    total_company : 0,
    total_hr : 0
  }]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [hrInfoList, setHRInfoList] = useState<Array<HRInformationResponseList> | []>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const {showLoader, hideLoader} = useLoader()

  const handleBulkSend = () => {
    console.log("Sending mail to IDs:", selectedIds);
    navigate('/template/selection', {state : {selectedIds : selectedIds}});
  };

  // Initial Load: Fetch both Summary and List together
  useEffect(() => {
    const fetchInitialData = async () => {
      showLoader(); // Show global overlay
      try {
        const [countRes, listRes] = await Promise.all([
          HRDashboardService.getHRDashboardCount(),
          HRDashboardService.getHRInformationList({ searchTerm: '', filterName: '', page: 1, limit: limit })
        ]);

        if (countRes?.length) setSummaryData(countRes);
        if (listRes?.data) setHRInfoList(listRes.data);
        if (listRes?.totalPages !== undefined) setTotalPages(listRes.totalPages);
        if (listRes?.totalRecords !== undefined) setTotalRecords(listRes.totalRecords);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        hideLoader(); // Hide global overlay only when both are done
      }
    };

    fetchInitialData();
  }, []); // Only runs once on mount

  // Filter/Search Load: Fetch only the list
  useEffect(() => {
    // We don't want to show the GLOBAL loader for every keystroke (it's annoying)
    // but for the first search, or a manual trigger, you can use it.
    const fetchFilteredList = async () => {
      try {
        const data = { searchTerm, filterName: filter, page, limit };
        const response = await HRDashboardService.getHRInformationList(data);
        setHRInfoList(response?.data || []);
        if (response?.totalPages !== undefined) setTotalPages(response.totalPages);
        if (response?.totalRecords !== undefined) setTotalRecords(response.totalRecords);
      } catch (error) { console.error(error); }
    };

    fetchFilteredList();
    
  }, [searchTerm, filter, page, limit]);

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
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                placeholder="Search HR or Company..."
                className="w-full pl-3 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <select 
                value={filter}
                onChange={(e) => { setFilter(e.target.value as FilterType); setPage(1); }}
                className="flex-1 p-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {hrSortOptions.map((item,index) => (
                  <option key={index} value={item.value}>{item.label}</option>
                ))}
              </select>

              <select 
                value={limit}
                onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                className="w-full md:w-32 p-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value={15}>15 / page</option>
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
              </select>
            </div>
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
        <div className="rounded-xl border border-slate-200 flex text-slate-400 italic">
          <HrInformationList 
          dataList = {hrInfoList}
          selectedIds={selectedIds} 
          setSelectedIds={setSelectedIds}
          page={page}
          limit={limit}/>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-sm text-slate-600">
            Showing {totalRecords === 0 ? 0 : (page - 1) * limit + 1} to {Math.min(page * limit, totalRecords)} of {totalRecords} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-slate-600 font-medium px-2">
              Page {page} of {totalPages === 0 ? 1 : totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || totalPages === 0}
              className="p-2 rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};