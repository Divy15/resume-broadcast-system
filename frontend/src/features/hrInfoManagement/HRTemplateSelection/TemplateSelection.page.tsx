import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTemplateList, getSelectedHRInfoList } from "./Template.service";
import { type selectedHRInfoList } from "./types/hrTemplate.types";

export const TemplateSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Get IDs from Navigation State
  const selectedIds = location.state?.selectedIds || [];

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [hrDetails, setHrDetails] = useState<selectedHRInfoList[]>([]); // To be populated by API
  const [templates, setTemplates] = useState<{id: number, template_name: string}[]>([]); // To be populated by API

  // Get template list from API 
  // Get selected HR info from API based on selectedIds
  useEffect(() => {
    // Fetch Template list
    const fetchTemplates = async () => {
      const templates = await getTemplateList();
      setTemplates(templates?.data);
    };

    // Fetch Selected HR Info
    const fetchSelectedHRInfo = async () => {
      if(selectedIds.length > 0){
        const hrInfoList = await getSelectedHRInfoList(selectedIds);
        setHrDetails(hrInfoList?.data);
      }
    };

    fetchSelectedHRInfo();
    fetchTemplates();
  },[]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-6">
        
        {/* Main Selection Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-50 p-6 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-800">Compose Bulk Outreach</h1>
            <p className="text-sm text-slate-500">Choose a template and review your recipients list.</p>
          </div>

          <div className="p-8 space-y-8">
            {/* TOP: Template Selection Section */}
            <section className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                1. Select Email Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="">-- Click to choose a template --</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.template_name}</option>
                ))}
              </select>
            </section>

            <hr className="border-slate-100" />

            {/* BOTTOM: Selected HR Table */}
            <section className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                2. Review Recipients ({hrDetails.length})
              </label>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                      <th className="px-6 py-3 border-b border-slate-200">Company</th>
                      <th className="px-6 py-3 border-b border-slate-200">HR Name</th>
                      <th className="px-6 py-3 border-b border-slate-200">Email</th>
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
          </div>

          {/* Action Footer */}
          <div className="bg-slate-50 p-6 flex items-center justify-between border-t border-slate-200">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              Cancel & Go Back
            </button>
            <button
              disabled={!selectedTemplate || hrDetails.length === 0}
              className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:bg-slate-300 disabled:shadow-none transition-all"
            >
              🚀 Send Mail to {hrDetails.length} HRs
            </button>
          </div>
        </div>
        
        <p className="text-center text-xs text-slate-400 italic">
          Tip: Ensure your default email signature is updated in settings.
        </p>
      </div>
    </div>
  );
};