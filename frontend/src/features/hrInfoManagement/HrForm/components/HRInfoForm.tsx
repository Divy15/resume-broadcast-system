import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HRFormService } from "../HRForm.service";
import {FormField} from "../../../CommonComponent/FormField";
import {type FormData, type FormErrors, type HRDetailErrors, type PositionListResult } from "../types/hrForm.types";
import { PositionField } from "../../HRTemplateSelection/components/PositionField.component";
import { getPositionList } from "../../HRTemplateSelection/Template.service";

export const HRInfoFormComp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ 
      companyName: "", 
      companyWebsite: "", 
      positionName: "",
      hrDetails: [{ hrName: "", hrEmail: "", hrMobile: "", hrLinkedInProfile: "" }]
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [positionList, setPositionList] = useState<PositionListResult[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    let active = true;
    if (!formData.positionName.trim()) {
        setPositionList([]);
        return;
    }
    const timer = setTimeout(async () => {
      try {
        const response = await getPositionList({ positionName: formData.positionName });
        if (active && response?.data) {
            setPositionList(response.data);
        } else if (active) {
            setPositionList([]);
        }
      } catch (e) {
        console.error("Error fetching positions", e);
      }
    }, 300);
    
    return () => {
        active = false;
        clearTimeout(timer);
    };
  }, [formData.positionName]);

  const handleSelectPosition = (name: string) => {
      setFormData(prev => ({ ...prev, positionName: name }));
      setShowDropdown(false);
  };

  const handleChangeCompany = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "positionName") setShowDropdown(true);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeHR = (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "hrMobile" && (!/^[0-9]*$/.test(value) || value.length > 10)) return;

    setFormData(prev => {
        const newHrDetails = [...prev.hrDetails];
        newHrDetails[index] = { ...newHrDetails[index], [name]: value };
        return { ...prev, hrDetails: newHrDetails };
    });
  };

  const handleAddHR = () => {
    setFormData(prev => ({
        ...prev,
        hrDetails: [...prev.hrDetails, { hrName: "", hrEmail: "", hrMobile: "", hrLinkedInProfile: "" }]
    }));
  };

  const handleRemoveHR = (index: number) => {
    setFormData(prev => ({
        ...prev,
        hrDetails: prev.hrDetails.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Required";
    if (!formData.companyWebsite.trim()) newErrors.companyWebsite = "Required";
    if (!formData.positionName.trim()) newErrors.positionName = "Required";
    
    let hasError = false;
    const hrErrors: HRDetailErrors[] = [];
    
    formData.hrDetails.forEach((hr, index) => {
        const err: HRDetailErrors = {};
        if (!hr.hrName.trim()) err.hrName = "Required";
        if (!/\S+@\S+\.\S+/.test(hr.hrEmail)) err.hrEmail = "Invalid email";
        if (hr.hrMobile.length !== 10 && hr.hrMobile.length !== 0) err.hrMobile = "Must be 10 digits";
        if (!hr.hrLinkedInProfile) err.hrLinkedInProfile = "Please enter HR LinkedIn Profile link.";
        
        if (Object.keys(err).length > 0) hasError = true;
        hrErrors[index] = err;
    });

    if (hasError) newErrors.hrDetails = hrErrors;
    
    setErrors(newErrors);
    return !newErrors.companyName && !newErrors.companyWebsite && !newErrors.positionName && !hasError;
  };

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(validateForm()){
      try {
        const response = await HRFormService.storeHRInfo(formData);
        if(response?.success){
          toast.success(response.message || "HR information stored successfully.");
          navigate(-1)
        }
      } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h2 className="text-xl font-bold">HR Registration</h2>
        </div>

        <form onSubmit={handleFormSubmission} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChangeCompany} error={errors.companyName} placeholder="Google" />
            <FormField label="Website" name="companyWebsite" value={formData.companyWebsite} onChange={handleChangeCompany} error={errors.companyWebsite} placeholder="https://..." />
          </div>

          <PositionField 
            formData={formData} 
            handleChange={handleChangeCompany} 
            errors={errors.positionName} 
            setShowDropdown={setShowDropdown} 
            showDropdown={showDropdown} 
            positionList={positionList} 
            handleSelectPosition={handleSelectPosition} 
          />

          <div className="space-y-6">
            {formData.hrDetails.map((hr, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg relative bg-slate-50">
                    {formData.hrDetails.length > 1 && (
                        <button 
                            type="button" 
                            onClick={() => handleRemoveHR(index)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                            Remove
                        </button>
                    )}
                    <h3 className="font-bold mb-4 text-slate-700">HR Details {index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <FormField label="HR Name" name="hrName" value={hr.hrName} onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChangeHR(index, e)} error={errors.hrDetails?.[index]?.hrName} />
                        <FormField label="HR Email" name="hrEmail" type="email" value={hr.hrEmail} onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChangeHR(index, e)} error={errors.hrDetails?.[index]?.hrEmail} />
                        <FormField label="HR Mobile" name="hrMobile" value={hr.hrMobile} onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChangeHR(index, e)} error={errors.hrDetails?.[index]?.hrMobile} />
                    </div>
                    <div>
                        <FormField label="HR LinkedIn Profile Link" name="hrLinkedInProfile" value={hr.hrLinkedInProfile} onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChangeHR(index, e)} error={errors.hrDetails?.[index]?.hrLinkedInProfile}/>
                    </div>
                </div>
            ))}
          </div>
          
          <div className="flex justify-start">
             <button type="button" onClick={handleAddHR} className="text-blue-600 font-semibold hover:text-blue-800 underline">+ Add Another HR</button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" className="px-6 py-2 text-slate-400 font-semibold" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="px-10 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};