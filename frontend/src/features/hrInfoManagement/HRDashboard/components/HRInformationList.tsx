import {type HRInforListProps} from "../types/dashboard.types"

export const HrInformationList = ({ dataList, selectedIds, setSelectedIds }: HRInforListProps) => {

  // Toggle individual checkbox
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Select All
  const toggleSelectAll = () => {
    if (selectedIds.length === dataList?.length) {
      setSelectedIds([]); // Deselect all
    } else {
      setSelectedIds(dataList?.map((item) => item.id)); // Select all IDs
    }
  };

  const isAllSelected = dataList?.length > 0 && selectedIds.length === dataList?.length;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:max-h-125 overflow-y-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              <input 
                type="checkbox" 
                checked={isAllSelected} 
                onChange={toggleSelectAll} 
              />
              <label className="px-2 text-xs">SELECT ALL</label>
            </th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Index</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Company Details</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">HR Name</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              Position name
            </th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500 flex justify-center">Status</th>
            <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dataList?.length > 0 ? (
            dataList.map((item, index) => (
              <tr key={item.id} className={`
    transition-colors
    ${
      item.is_verified === null
        ? "bg-yellow-50 hover:bg-yellow-100"
        : item.is_verified === false
        ? "bg-red-50 hover:bg-red-100"
        : "bg-green-50 hover:bg-green-100"
    }
  `}>
                <td className="px-6 py-4 text-sm">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(item.id)} 
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">#{index + 1}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-800">{item.company_name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.hr_name}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.position_name}</td>
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
                <td className="px-6 py-4 flex justify-end">
                  <button className="border rounded-full p-3 w-25 mx-2 hover:bg-green-300">Send</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 does i will make used chaipatti to carbon? how many plant are there in india are doing this?py-10 text-center text-slate-500 italic">
                No HR information found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};