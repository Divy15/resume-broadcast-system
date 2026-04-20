import React, { useCallback, useEffect, useState } from "react";
import { StatCard } from "../CommonComponent/StatCard";
import { CompanyForm } from "./components/CompanyForm";
import { CompanyList } from "./components/CompanyList";
import type { Company } from "./types/index";
import { CompanyRegistrationService } from "./CompanyRegistration.service";
import { toast } from "react-hot-toast";

export const CompanyRegistrationPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [count, setCount] = useState<number>(0);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // --- API FETCHERS ---

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      // Run both in parallel
      const [listResponse, countData] = await Promise.all([
        CompanyRegistrationService.getCompanyList(),
        CompanyRegistrationService.getCompanyCount(),
      ]);
      setCompanies(listResponse?.data || []);
      setCount(countData || 0);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // --- SEARCH/FILTER API ---
  // If your list is small, keep the local useMemo filter. 
  // If it's large, use the API:
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      fetchInitialData();
      return;
    }
    try {
      const response = await CompanyRegistrationService.getFilteredCompanyList({ name: query });
      setCompanies(response?.data || []);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // --- ACTIONS ---

  const handleAddOrUpdate = async (data: Omit<Company, "id">) => {
    try {
      if (editingCompany) {
        // UPDATE
        await CompanyRegistrationService.updateCompanyData({
          ...data,
          company_id: Number(editingCompany.id), // Ensure ID is number if your backend requires it
        });
        toast.success("Company updated successfully");
      } else {
        // CREATE
        await CompanyRegistrationService.storeCompanyData(data);
        toast.success("Company registered successfully");
      }
      setIsModalOpen(false);
      setEditingCompany(null);
      fetchInitialData(); // Refresh list and count
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    
    try {
      await CompanyRegistrationService.deleteCompanyData({ company_id: Number(id) });
      toast.success("Company deleted");
      fetchInitialData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openEditModal = (company: Company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="w-full md:max-w-xs">
            <StatCard label="Total Registrations" count={count} />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search company..."
                className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                setEditingCompany(null);
                setIsModalOpen(true);
              }}
              className="w-full sm:w-auto py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg"
            >
              + Register
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading companies...</div>
        ) : (
          <CompanyList
            companies={companies}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-10 right-0 text-white"
              >
                Close
              </button>
              <CompanyForm
                onSubmit={handleAddOrUpdate}
                initialData={editingCompany}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
