


export const FileUpload = ({ onFileSelect, selectedFileName, error }: any) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]); // Send the first file up to the parent
    }
  };

    return(
    <div className="group">
      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
        3. Upload Resume
      </label>
      <label className={`flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-xl cursor-pointer hover:bg-indigo-50/30 ${
      error ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-indigo-400"
    }`}>
        <div className="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 ${selectedFileName ? 'text-green-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm font-medium text-slate-500 text-center">
            {selectedFileName ? (
              <span className="text-indigo-600 font-bold">Selected: {selectedFileName}</span>
            ) : (
              <>Drop PDF here or <span className="text-indigo-600 underline">browse</span></>
            )}
          </span>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept=".pdf,.doc,.docx" 
          onChange={handleFileChange} // <--- THIS IS KEY
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-2 italic font-medium text-center">{error}</p>}
    </div>
    )
};