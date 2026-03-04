

export const TemplateSelect = ({ value, onChange, templates, error }: any) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
      1. Select Email Template
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 border-2 rounded-xl outline-none transition-all ${
        error ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-indigo-500"
      }`}
    >
      <option value="">-- Click to choose a template --</option>
      {templates.map((t: any) => (
        <option key={t.id} value={t.id}>{t.template_name}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1 italic font-medium">{error}</p>}
  </div>
);