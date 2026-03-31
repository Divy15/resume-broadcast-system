import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTemplateList,
  getSelectedHRInfoList,
  getPositionList,
  storeTemplateInfo,
  getUserReueList,
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
import { ExistingResumeSelect } from "./components/ExistingResumeSelect.component";

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
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [uploadedFileId, setUploadedFileId] = useState<number | null>(null);
  const [resumeList, setResumeList] = useState<Array<{id:number, filename:string, upload_at: string}> | []>([]);
  
  // Mock/Fetched existing resumes
  useEffect(() => {
    const fetchResumeList = async () => {
      const response = await getUserReueList();
      if(response?.data){
        setResumeList(response?.data);
      };
    };
    fetchResumeList();
  }, []);

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

  // When switching tabs, it's safer to clear the "other" selection
useEffect(() => {
  if (resumeOption === "new") {
    setSelectedResumeId(null); // Clear the dropdown choice
  } else {
    setUploadedFileId(null);   // Clear the S3 upload choice (optional, but cleaner)
  }
}, [resumeOption]);

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
    
    if (resumeOption === "new" && !uploadedFileId) {
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
    // We no longer send a File in this step. We send the IDs.
  const submissionPayload = {
    position: formData.positionName,
    template: selectedTemplate,
    hrIds: selectedIds,
    // Use the ID from the immediate upload OR the existing selected ID
    resume_id: resumeOption === "new" ? uploadedFileId : selectedResumeId,
  };

    try {
      const result = await storeTemplateInfo(submissionPayload);
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
                <ExistingResumeSelect
                  resumeList={resumeList}
                  selectedResumeId={selectedResumeId}
                  onSelect={setSelectedResumeId}
                  error={errors.resume}
                />
              ) : (
                <FileUpload
                  onUploadSuccess={(id: number) => setUploadedFileId(id)}
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
                disabled={loading || !selectedTemplate || hrDetails.length === 0 || !(uploadedFileId || selectedResumeId)}
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