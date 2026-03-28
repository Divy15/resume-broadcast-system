import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTemplateList,
  getSelectedHRInfoList,
  getPositionList,
  storeTemplateInfo,
} from "./Template.service";
import {
  type selectedHRInfoList,
  type FormData as FormDataType, // Renamed to avoid collision with browser API
  type PositionListResult,
  type FormErrors,
} from "./types/hrTemplate.types";
import { FileUpload } from "./components/FileUpload.component";
import { PositionField } from "./components/PositionField.component";
import { RecipientTable } from "./components/RecipientTable.component";
import { TemplateSelect } from "./components/TemplateSelect.component";

export const TemplateSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedIds = location.state?.selectedIds || [];

  // --- State Management ---
  const [formData, setFormData] = useState<FormDataType>({
    positionName: "",
    template: 0,
    resume: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [positionList, setPositionList] = useState<PositionListResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [hrDetails, setHrDetails] = useState<selectedHRInfoList[]>([]);
  const [templates, setTemplates] = useState<{ id: number; template_name: string }[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Resume State
  const [resumeOption, setResumeOption] = useState<"new" | "existing">("new");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  
  // Mock/Fetched existing resumes
  const resumeList = [{ id: 123, file_name: "John_Doe_CV_2024.pdf" }];

  // --- Effects ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [templateRes, hrRes] = await Promise.all([
          getTemplateList(),
          selectedIds.length > 0 ? getSelectedHRInfoList(selectedIds) : Promise.resolve({ data: [] })
        ]);
        setTemplates(templateRes?.data || []);
        setHrDetails(hrRes?.data || []);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      }
    };
    fetchData();
  }, [selectedIds]);

  useEffect(() => {
    if (!formData.positionName.trim()) {
        setPositionList([]);
        return;
    }
    const timer = setTimeout(async () => {
      try {
        const response = await getPositionList({ positionName: formData.positionName });
        if (response?.data) setPositionList(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [formData.positionName]);

  // --- Handlers ---
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!selectedTemplate) newErrors.template = "Please select an email template.";
    if (!formData.positionName.trim()) newErrors.positionName = "Position name is required.";
    
    if (resumeOption === "new" && !selectedFile) {
        newErrors.resume = "Please upload a new resume.";
    } else if (resumeOption === "existing" && !selectedResumeId) {
        newErrors.resume = "Please select an existing resume.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmission = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const submissionData = new FormData(); // Native Browser API
    submissionData.append("position", formData.positionName);
    submissionData.append("template_id", selectedTemplate);
    submissionData.append("hrIds", JSON.stringify(selectedIds));

    if (resumeOption === "new" && selectedFile) {
      submissionData.append("resume_file", selectedFile);
    } else {
      submissionData.append("existing_resume_id", String(selectedResumeId));
    }

    try {
      const result = await storeTemplateInfo(submissionData);
      if (result?.success) navigate("/email/jobs");
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 bg-linear-to-r from-white to-slate-50">
            <h1 className="text-2xl font-bold text-slate-900">Compose Outreach</h1>
            <p className="text-slate-500 mt-1">Configure your campaign and select recipients.</p>
          </div>

          <form onSubmit={handleFormSubmission} className="p-8 space-y-8">
            {/* Template & Position Row */}
            <div className="grid md:grid-cols-2 gap-8">
              <TemplateSelect
                value={selectedTemplate}
                onChange={setSelectedTemplate}
                templates={templates}
                error={errors.template}
              />
              <PositionField
                formData={formData}
                handleChange={(e: any) => {
                    const { name, value } = e.target;
                    if (name === "positionName") setShowDropdown(true);
                    setFormData(prev => ({ ...prev, [name]: value }));
                }}
                errors={errors.positionName}
                showDropdown={showDropdown}
                positionList={positionList}
                handleSelectPosition={(name: any) => {
                    setFormData(prev => ({ ...prev, positionName: name }));
                    setShowDropdown(false);
                }}
                setShowDropdown={setShowDropdown}
              />
            </div>

            <hr className="border-slate-100" />

            {/* Resume Selection Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">Resume Attachment</label>
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    checked={resumeOption === "new"}
                    onChange={() => setResumeOption("new")}
                  />
                  <span className={`text-sm ${resumeOption === 'new' ? 'font-medium text-slate-900' : 'text-slate-500'}`}>Upload New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    checked={resumeOption === "existing"}
                    onChange={() => setResumeOption("existing")}
                  />
                  <span className={`text-sm ${resumeOption === 'existing' ? 'font-medium text-slate-900' : 'text-slate-500'}`}>Use Existing</span>
                </label>
              </div>

              {resumeOption === "existing" ? (
                <div className="relative">
                  <select
                    className={`w-full p-3 bg-slate-50 border rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.resume ? 'border-red-500' : 'border-slate-200'}`}
                    onChange={(e) => setSelectedResumeId(Number(e.target.value))}
                    value={selectedResumeId || ""}
                  >
                    <option value="">-- Choose a saved resume --</option>
                    {resumeList.map((r) => (
                      <option key={r.id} value={r.id}>{r.file_name}</option>
                    ))}
                  </select>
                  {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                </div>
              ) : (
                <FileUpload
                  onFileSelect={(file: File) => setSelectedFile(file)}
                  selectedFileName={selectedFile?.name}
                  error={errors.resume}
                />
              )}
            </div>

            <hr className="border-slate-100" />

            {/* Recipients Section */}
            <div className="space-y-4">
               <h3 className="text-sm font-semibold text-slate-700">Recipients ({hrDetails.length})</h3>
               <RecipientTable hrDetails={hrDetails} />
            </div>

            {/* Action Footer */}
            <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
              >
                Back
              </button>
              <button
                disabled={loading || !selectedTemplate || hrDetails.length === 0}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg disabled:bg-slate-300 disabled:shadow-none transition-all active:scale-95"
              >
                {loading ? "Sending..." : `🚀 Send to ${hrDetails.length} Recipients`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};