import { useState, useRef } from "react";
import { storeResume } from "../Template.service";

export const FileUpload = ({ onUploadSuccess, error }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [isSuccessfullyUploaded, setIsSuccessfullyUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Just select the file, don't upload yet
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalFile(file);
      setIsSuccessfullyUploaded(false);
      onUploadSuccess(null); // Reset parent ID because this new file isn't uploaded yet
    }
  };

  // Step 2: Triggered by the Button
  const handleUploadTrigger = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (!localFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("resume", localFile);

    try {
      const response = await storeResume(formData);
      if (response?.status === "success") {
        setIsSuccessfullyUploaded(true);
        onUploadSuccess(response.fileId); // Now the parent knows it's safe to submit
      }
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-slate-700 uppercase">
        3. Upload Resume
      </label>
      
      <div className={`relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl transition-all ${
        error && !localFile ? "border-red-500 bg-red-50" : "border-slate-200 bg-white"
      }`}>
        
        {!localFile ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="text-indigo-600 font-medium">Click to select PDF</span>
            <span className="text-xs text-slate-400 mt-1">File will not be uploaded until you click 'Confirm Upload'</span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">📄</div>
              <div>
                <p className="text-sm font-semibold text-slate-700 truncate max-w-50">
                  {localFile.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(localFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {isSuccessfullyUploaded ? (
              <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                ✓ Uploaded to S3
              </span>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLocalFile(null)}
                  className="text-xs text-red-500 font-medium hover:underline"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={handleUploadTrigger}
                  disabled={isUploading}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 transition-all"
                >
                  {isUploading ? "Uploading..." : "Confirm Upload"}
                </button>
              </div>
            )}
          </div>
        )}

        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept=".pdf" 
          onChange={handleFileSelection} 
        />
      </div>
      
      {error  && (
        <p className="text-red-500 text-xs italic font-medium">{error}</p>
      )}
    </div>
  );
};