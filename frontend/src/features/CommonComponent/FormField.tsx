
export const FormField = ({ label, name, value, onChange, error, type = "text", placeholder = "" }: any) => (
  <div className="space-y-1 w-full">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border-b-2 py-2 outline-none transition-colors ${error ? "border-red-500" : "border-slate-200 focus:border-blue-500"}`}
      autoComplete="off"
    />
    {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
  </div>
);