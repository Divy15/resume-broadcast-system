import { useNavigate } from "react-router-dom";
import { type HRInforListProps } from "../types/dashboard.types";

export const HrInformationList = ({ dataList, selectedIds, setSelectedIds }: HRInforListProps) => {
  const navigate = useNavigate();

  // Helper utility to convert ISO timestamp strings into clean local displays
  const formatDate = (dateString: string | null) => {
  if (!dateString) return "—"; 

  // If the string doesn't end with Z or a offset, force JavaScript to read it as UTC
  const utcNormalizedString = dateString.endsWith("Z") ? dateString : `${dateString}Z`;
  const date = new Date(utcNormalizedString);
  
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata" // Forces the output display rendering to show Indian Standard Time
  });
};

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === dataList?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(dataList?.map((item) => item.id));
    }
  };

  const isAllSelected = dataList?.length > 0 && selectedIds.length === dataList?.length;

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm h-125 overflow-auto relative">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm">
          <tr className="border-b border-slate-200">
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} />
              <label className="px-2 text-xs">SELECT ALL</label>
            </th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Index</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Company Details</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">HR Name</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Position name</th>
            
            {/* 1. NEW COLUMN HEADERS ADDED HERE */}
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Registered On</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Last Applied</th>
            
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500 flex justify-center">Status</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dataList?.length > 0 ? (
            dataList.map((item, index) => (
              <tr key={item.id} className={`transition-colors ${
                item.is_verified === null
                  ? "bg-yellow-50 hover:bg-yellow-100"
                  : item.is_verified === false
                  ? "bg-red-50 hover:bg-red-100"
                  : "bg-green-50 hover:bg-green-100"
              }`}>
                <td className="px-6 py-4 text-sm">
                  <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">#{index + 1}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-800">{item.company_name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.hr_name}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.position_name}</td>
                
                {/* 2. NEW INTERACTIVE DATA CELLS RENDERED HERE */}
                <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                  {formatDate(item.created_at)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap italic">
                  {formatDate(item.last_applied_at)}
                </td>

                <td className="px-6 py-4">
                  {item.is_applied ? (
                    <span className="flex justify-center items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Applied
                    </span>
                  ) : (
                    <span className="flex justify-center items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600">
                      Not Applied
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button
                    className="border rounded-full px-4 py-2 text-sm font-medium border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                    onClick={() => navigate(`/hr/edit/${item.id}`)}
                  >
                    View
                  </button>
                  <button className="border rounded-full p-3 w-25 hover:bg-green-300" onClick={() => toggleSelect(item.id)}>
                    Send
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* 3. UPDATED COLSPAN TO 9 TO MATCH ALL THE NEW HEADERS CORRECTLY */}
              <td colSpan={9} className="px-6 py-10 text-center text-slate-500 italic">
                No HR information found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};