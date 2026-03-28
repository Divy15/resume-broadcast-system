import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { getHRRegistrationBarChartData } from '../Dashboard.service';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-4 py-3 text-sm bg-white shadow-lg border border-gray-100">
        <p className="text-indigo-500 font-semibold mb-1">{label}</p>
        <p className="text-gray-800 font-black text-base">
          {payload[0].value}
          <span className="text-gray-400 text-xs font-normal ml-1">registrations</span>
        </p>
      </div>
    );
  }
  return null;
};

export const HRResgistrationBarChart = () => {
  const currentMonth = (new Date().getMonth() + 1).toString();
  const currentYear = new Date().getFullYear();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    month: currentMonth,
    year: currentYear,
    timezone: userTimezone,
  });

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const result = await getHRRegistrationBarChartData(filters);
      const formattedData = result?.data.map((item: any) => ({
        ...item,
        displayDate: new Date(item.registration_date).toLocaleDateString('en-US', {
          day: '2-digit', month: 'short',
        }),
        count: Number(item.total_count)
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching HR chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchChartData(); }, [filters.month, filters.year]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  const peakDay = data.reduce((max: any, d) => d.count > (max?.count ?? 0) ? d : max, null);

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-500">HR Users</span>
          </div>
          <h3 className="text-lg font-black text-gray-800">HR Registrations</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Daily activity for {months[parseInt(filters.month) - 1]} {filters.year}
          </p>
        </div>

        <div className="flex gap-2">
          <select
            className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
          >
            {months.map((m, i) => (
              <option key={m} value={(i + 1).toString()}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            className="w-24 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: parseInt(e.target.value) })}
          />
        </div>
      </div>

      {/* Mini stats */}
      <div className="flex gap-3 mb-5">
        <div className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
          <p className="text-xs text-indigo-400">Total</p>
          <p className="text-lg font-black text-indigo-600">{totalCount}</p>
        </div>
        {peakDay && peakDay.count > 0 && (
          <div className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
            <p className="text-xs text-indigo-400">Peak Day</p>
            <p className="text-lg font-black text-indigo-600">
              {peakDay.displayDate}
              <span className="text-sm font-semibold ml-1">({peakDay.count})</span>
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-3">
            <div className="flex gap-1 items-end">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="w-2 rounded bg-indigo-100 animate-pulse"
                  style={{ height: `${20 + i * 10}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <p className="text-xs text-gray-400">Loading chart data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-100">
            <span className="text-3xl">📊</span>
            <p className="text-sm text-gray-400">No registrations for this period</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <defs>
                <linearGradient id="hr-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="displayDate"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#9ca3af' }}
                interval={Math.ceil(data.length / 10)}
              />
              <YAxis
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#9ca3af' }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
              <Bar dataKey="count" radius={[5, 5, 0, 0]} barSize={18} maxBarSize={30}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.count > 0 ? 'url(#hr-gradient)' : '#f3f4f6'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};