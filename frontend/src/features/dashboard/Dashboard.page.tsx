import { useEffect, useState } from "react";
import { CompanyRegistrationBarChart } from "./components/CompanyRegistrationBarChart.component"
import { HRResgistrationBarChart } from "./components/HRResgistrationBarChart.component"
import { getTotalCounts } from "./Dashboard.service";
import type { DashboardCounts } from "./types";

export const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const [totalCount, setTotalCounts] = useState<DashboardCounts | null>(null);

  useEffect(() => {
    const fetchTotalCounts = async() => {
      try {
       const response = await getTotalCounts();
       setTotalCounts(response?.data[0]);
      } catch (error: any) {
        console.error("Failed to fetch total counts:", error);
      }
    }

    fetchTotalCounts();
  }, []);

  return (
    <div className="text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-1">
              Analytics Overview
            </p>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-gray-400 font-medium">{today}</span>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total HR Users', value: totalCount?.total_hr ?? '-', border: 'border-indigo-100',  text: 'text-indigo-600',  bg: 'bg-indigo-50',  icon: '👤' },
            { label: 'Companies',      value: totalCount?.total_company ?? '-', border: 'border-emerald-100', text: 'text-emerald-600', bg: 'bg-emerald-50', icon: '🏢' },
            { label: 'This Month Send Email',     value: totalCount?.total_email_send ?? '-', border: 'border-pink-100',    text: 'text-pink-600',   bg: 'bg-pink-50',    icon: '📅' },
          ].map(({ label, value, border, text, bg, icon }) => (
            <div key={label}
              className={`rounded-2xl bg-white border ${border} shadow-sm p-5 hover:shadow-md transition-shadow duration-200`}>
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center text-lg mb-3`}>
                {icon}
              </div>
              <p className={`text-2xl font-black ${text}`}>{value}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <HRResgistrationBarChart />
          <CompanyRegistrationBarChart />
        </div>
      </div>
    </div>
  );
};