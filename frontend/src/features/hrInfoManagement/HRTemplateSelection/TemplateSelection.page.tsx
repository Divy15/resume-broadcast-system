import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, type ChangeEvent } from "react";
import { getTemplateList, getSelectedHRInfoList, getPositionList, storeTemplateInfo } from "./Template.service";
import { type selectedHRInfoList, type FormData, type PositionListResult, type FormErrors } from "./types/hrTemplate.types";
import { FileUpload } from "./components/FileUpload.component";
import { PositionField } from "./components/PositionField.component";
import { RecipientTable } from "./components/RecipientTable.component";
import { TemplateSelect } from "./components/TemplateSelect.component"

export const TemplateSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedIds = location.state?.selectedIds || [];

  const [formData, setFormData] = useState<FormData>({
    positionName: "",
    template : 0,
    resume : null
  });
  const [positionList, setPositionList] = useState<PositionListResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [hrDetails, setHrDetails] = useState<selectedHRInfoList[]>([]);
  const [templates, setTemplates] = useState<{ id: number; template_name: string }[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // API: Initial Load
  useEffect(() => {
    getTemplateList().then(res => setTemplates(res?.data || []));
    if (selectedIds.length > 0) {
      getSelectedHRInfoList(selectedIds).then(res => setHrDetails(res?.data || []));
    }
  }, []);

  // API: Position Search with Debounce
  useEffect(() => {
    if (!formData.positionName.trim()) return setPositionList([]);
    const timer = setTimeout(async () => {
      const response = await getPositionList({ positionName: formData.positionName });
      if (response?.data) setPositionList(response.data);
    }, 300);
    return () => clearTimeout(timer);
  }, [formData.positionName]);

  const validateForm = () => {
  const newErrors: FormErrors = {};

  if (!selectedTemplate) newErrors.template = "Please select an email template.";
  if (formData.positionName.trim() === '' || formData.positionName.trim() === null) newErrors.positionName = "Position name is required.";
  if (!selectedFile) newErrors.resume = "Please upload a resume.";

  setErrors(newErrors);
  // Returns true if no errors found
  return Object.keys(newErrors).length === 0;
};

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "positionName") setShowDropdown(true);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectPosition = (name: string) => {
    setFormData(prev => ({ ...prev, positionName: name }));
    setShowDropdown(false);
  };

  const handleFormSubmission = async (e:any) => {
    e.preventDefault();

    if (!validateForm()) {
    return; // Stop here if validation fails
  }
    // To upload files, you usually need the FormData API
    const finalData = new FormData();
    finalData.append("position", formData.positionName);
    finalData.append("template", selectedTemplate);
    if (selectedFile) {
      finalData.append("resume", selectedFile);
    }
    finalData.append("hrIds", selectedIds );

    const result = await storeTemplateInfo(finalData);
    console.log(result);

    if(result?.success){
      navigate('/email/jobs')
    };
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-50 p-6 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-800">Compose Bulk Outreach</h1>
            <p className="text-sm text-slate-500">Review recipients and select your template.</p>
          </div>

          <form onSubmit={handleFormSubmission}>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8 items-start">
                <TemplateSelect 
                  value={selectedTemplate} 
                  onChange={setSelectedTemplate} 
                  templates={templates}
                  error={errors.template} 
                />
                <PositionField 
                  formData={formData} 
                  handleChange={handleChange} 
                  errors={errors.positionName} 
                  showDropdown={showDropdown} 
                  positionList={positionList} 
                  handleSelectPosition={handleSelectPosition} 
                  setShowDropdown={setShowDropdown}
                />
              </div>

              <hr className="border-slate-100" />
              <FileUpload 
              onFileSelect={(file:any) => setSelectedFile(file)} 
              selectedFileName={selectedFile?.name}
              error={errors.resume} />
              <hr className="border-slate-100" />
              <RecipientTable hrDetails={hrDetails} />
            </div>

            {/* Footer Actions */}
            <div className="bg-slate-50 p-6 flex items-center justify-between border-t border-slate-200">
              <button type="button" onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-800 font-medium transition-colors">
                Cancel & Go Back
              </button>
              <button 
                disabled={!selectedTemplate || hrDetails.length === 0}
                className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg disabled:bg-slate-300 transition-all"
              >
                🚀 Send Mail to {hrDetails.length} HRs
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};