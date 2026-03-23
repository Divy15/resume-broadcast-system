import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Search, Delete } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deleteTemplate, getFilterTemplateList, getTemplateList } from './EmailTemplateList.service';
import toast from 'react-hot-toast';

export interface EmailTemplate {
  id: number;
  template_name: string;
  updated_at: string;
};

const EmailTemplateListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data - In a real app, this comes from an API
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);

    const handleDeleteTemplate = async(templateid: number) => {
      try {
        const response = await deleteTemplate({templateid: templateid});

        console.log("template is deleted.", response);
        if(response?.success){
          toast.success(response.message || "Template deleted successfully.");
          setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template.id !== templateid)
        );
        }
      } catch (error) { console.error("Deletion failed:", error); }
  };

  useEffect(() => {
  const fetchTemplates = async () => {
    try {
      let response;
      
      if (searchTerm.trim() === '') {
        // If search is empty, get the full list
        response = await getTemplateList();
      } else {
        // If there is a search term, get the filtered list
        response = await getFilterTemplateList({ template_name: searchTerm });
      }

      setTemplates(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      setTemplates([]);
    }
  };

  // Debounce logic: Wait for the user to stop typing (300ms) 
  // before calling the API to save server resources
  const delayDebounceFn = setTimeout(() => {
    fetchTemplates();
  }, 300);

  return () => clearTimeout(delayDebounceFn);
}, [searchTerm]); // This handles both initial mount and typing

  return (
    <div className="bg-gray-50 p-6 md:p-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Email Templates</h1>
        <button 
          onClick={() => navigate('/templates/new')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> Create Template
        </button>
      </div>

      {/* Filter Section */}
      <div className="relative mb-6">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <Search size={18} />
        </span>
        <input 
          type="text"
          placeholder="Filter by template name..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Template Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Template Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Last Edited</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {templates?.length > 0 ?( templates.map((template, index) => (
              <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400 font-mono">#{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{template.template_name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{template.updated_at?.split("T")[0]}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => navigate(`/templates/edit/${template.id}`)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                  >
                    <Delete size={16} />
                  </button>
                </td>
              </tr>
            ))) : (
              <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-slate-500 italic">
                No Template information found.
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailTemplateListPage;