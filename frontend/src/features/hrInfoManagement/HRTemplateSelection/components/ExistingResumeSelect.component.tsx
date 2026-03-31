import { useState } from "react";

export const ExistingResumeSelect = ({ resumeList, selectedResumeId, onSelect, error }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  // Find the currently selected resume object to show its name in the box
  const selectedResume = resumeList.find((r: any) => r.id === selectedResumeId);

  return (
    <div className="relative space-y-2">
      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
        Select from Previous Uploads
      </label>

      {/* The Selection Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 bg-white border-2 rounded-xl cursor-pointer flex justify-between items-center transition-all ${
          error ? "border-red-500 shadow-sm shadow-red-100" : "border-slate-200 hover:border-indigo-400"
        }`}
      >
        <span className={`${selectedResume ? "text-slate-900 font-medium" : "text-slate-400"}`}>
          {selectedResume ? selectedResume.filename : "-- Choose a saved resume --"}
        </span>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* The Scrollable List (Only shows if isOpen is true) */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
          <div className="max-h-55 overflow-y-auto custom-scrollbar">
            {resumeList.length > 0 ? (
              resumeList.map((r: any) => (
                <div
                  key={r.id}
                  onClick={() => {
                    onSelect(r.id);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer border-b border-slate-50 last:border-0 hover:bg-indigo-50 transition-colors ${
                    selectedResumeId === r.id ? "bg-indigo-50 border-l-4 border-l-indigo-600" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800 truncate">
                      {r.filename}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                      Uploaded: {new Date(r.upload_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-400 text-sm italic">
                No resumes found. Please upload a new one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside (optional overlay) */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}

      {error && <p className="text-red-500 text-xs mt-1 italic font-medium">{error}</p>}
    </div>
  );
};