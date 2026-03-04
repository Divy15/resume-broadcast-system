import { type selectedHRInfoList} from "../types/hrTemplate.types"


export const RecipientTable = ({ hrDetails }: { hrDetails: selectedHRInfoList[] }) => (
  <section className="space-y-4">
    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
      Total Selected HR ({hrDetails.length})
    </label>
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
            <th className="px-6 py-3 border-b">Company</th>
            <th className="px-6 py-3 border-b">HR Name</th>
            <th className="px-6 py-3 border-b">Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {hrDetails.map((hr) => (
            <tr key={hr.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold text-slate-800">{hr.company_name}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{hr.hr_name}</td>
              <td className="px-6 py-4 text-sm text-indigo-600 font-mono">{hr.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);