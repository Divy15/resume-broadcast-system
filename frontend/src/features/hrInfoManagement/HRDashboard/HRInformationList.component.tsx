
interface HRInformationResponseList {
  company_name: string;
  hr_name: string;
  id: number;
  is_applied: boolean | null;
  is_verified: boolean | null;
}

interface HRInforListProps {
  dataList: HRInformationResponseList[]; // Changed to an array to map through
}

export const HrInformationList = ({ dataList }: HRInforListProps) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Index</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Company Details</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">HR Name</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 flex justify-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dataList.length > 0 ? (
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
                <td className="px-6 py-4 text-sm text-slate-400">#{index + 1}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-800">{item.company_name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.hr_name}</td>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-slate-500 italic">
                No HR information found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};