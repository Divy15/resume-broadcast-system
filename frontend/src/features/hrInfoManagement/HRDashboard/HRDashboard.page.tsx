import { useNavigate } from "react-router-dom";
import { HRFilterComp } from "./components/HRFilter";


export const HRDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full p-6 md:p-12">
      <div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">HR Management</h1>
            <p className="text-sm text-gray-500">
              Register and manage new human resource profiles.
            </p>
          </div>

          <button
            className="mt-4 md:mt-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center"
            onClick={() => navigate('/hr/add')}
          >
            <span className="mr-2">+</span> Add HR Info
          </button>
        </div>

        {/* Search Controller panel */}
        <div>
          <HRFilterComp />
        </div>
      </div>
    </div>
  );
};
