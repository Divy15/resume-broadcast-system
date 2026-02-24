import React, { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { HRFormService } from "./HRForm.service";

// --- Types ---
interface FormData { companyName: string; companyWebsite: string; hrName: string; hrEmail: string; hrMobile: string; positionName: string; }
type FormErrors = Partial<Record<keyof FormData, string>>;
interface PositionListResult { id: number, position_name: string};

// --- Reusable Sub-Component ---
const FormField = ({ label, name, value, onChange, error, type = "text", placeholder = "" }: any) => (
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

export const HRInfoFormComp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ companyName: "", companyWebsite: "", hrName: "", hrEmail: "", hrMobile: "", positionName: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [positionList, setPositinList] = useState<Array<PositionListResult> | []>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "hrMobile" && (!/^[0-9]*$/.test(value) || value.length > 10)) return;

    if (name === "positionName") {
      setShowDropdown(true);
    };

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Required";
    if (!formData.companyWebsite.trim()) newErrors.companyWebsite = "Required";
    if (!formData.hrName.trim()) newErrors.hrName = "Required";
    if (!/\S+@\S+\.\S+/.test(formData.hrEmail)) newErrors.hrEmail = "Invalid email";
    if (formData.hrMobile.length !== 10 && formData.hrMobile.length !== 0) newErrors.hrMobile = "Must be 10 digits";
    if (!formData.positionName) newErrors.positionName = "Please enter position name.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmission = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(validateForm()){
      const response = await HRFormService.storeHRInfo(formData);
      if(response?.success){
        navigate(-1)
      }
    }
  };

  // Helper to select a position from the list
  const handleSelectPosition = (name: string) => {
    setFormData(prev => ({ ...prev, positionName: name }));
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchPositionList = async () => {
      // Only fetch if there's a value, otherwise clear list
      if (formData.positionName.trim() === "") {
        setPositinList([]);
        return;
      }

      const data = {positionName : formData?.positionName};
      const response = await HRFormService.positionList(data);
      if(response?.length !== 0){
        setPositinList(response);
      };
    };


    const timer = setTimeout(() => {
        fetchPositionList();
    }, 300);

    return () => clearTimeout(timer);
  }, [formData?.positionName])

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h2 className="text-xl font-bold">HR Registration</h2>
        </div>

        <form onSubmit={(e) => handleFormSubmission(e)} className="p-8 space-y-6">
          <div className="flex gap-4">
            <FormField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} error={errors.companyName} placeholder="Google" />
            <FormField label="Website" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} error={errors.companyWebsite} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="HR Name" name="hrName" value={formData.hrName} onChange={handleChange} error={errors.hrName} />
            <FormField label="Email" name="hrEmail" type="email" value={formData.hrEmail} onChange={handleChange} error={errors.hrEmail} />
            <FormField label="Mobile" name="hrMobile" value={formData.hrMobile} onChange={handleChange} error={errors.hrMobile} />
          </div>

          <div className="relative space-y-1">
            <FormField label="Position Name" name="positionName" value={formData.positionName} onChange={handleChange} error={errors.positionName} 
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}/>

            {/* --- Position Dropdown --- */}
            {showDropdown && positionList.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1">
                {positionList.map((pos) => (
                  <li 
                    key={pos.id}
                    onClick={() => handleSelectPosition(pos.position_name)}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-slate-700 border-b border-slate-50 last:border-none"
                  >
                    {pos.position_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="px-6 py-2 text-slate-400 font-semibold" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="px-10 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};