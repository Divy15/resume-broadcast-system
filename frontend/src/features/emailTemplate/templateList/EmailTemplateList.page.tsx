import React, { useState } from 'react';
import { Plus, Edit2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  lastEdited: string;
};

const EmailTemplateListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data - In a real app, this comes from an API
  const [templates] = useState<EmailTemplate[]>([
    { id: '1', name: 'Software Engineer Referral', subject: 'Referral for {{position_name}}', body: '...', lastEdited: '2026-03-08' },
    { id: '2', name: 'Follow Up', subject: 'Checking in - {{company_name}}', body: '...', lastEdited: '2026-03-09' },
  ]);

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {filteredTemplates.map((template) => (
              <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400 font-mono">#{template.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{template.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{template.lastEdited}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => navigate(`/templates/edit/${template.id}`)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                  >
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailTemplateListPage;