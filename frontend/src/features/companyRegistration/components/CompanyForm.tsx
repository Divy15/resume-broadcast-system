import React, { useState, useEffect } from 'react';
import type { Company } from '../types/index';

interface CompanyFormProps {
  onSubmit: (company: Omit<Company, 'id'>) => void;
  initialData?: Company | null;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ name: '', website: '', linkedIn: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        website: initialData.website,
        linkedIn: initialData.linkedIn || '',
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', website: '', linkedIn: '' }); // Reset
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">{initialData ? 'Edit Company' : 'Register New Company'}</h2>
      <div>
        <label className="block text-sm font-medium text-slate-700">Company Name</label>
        <input
          required
          type="text"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Website URL</label>
        <input
          required
          type="url"
          placeholder="https://example.com"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">LinkedIn Profile (Optional)</label>
        <input
          type="url"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={formData.linkedIn}
          onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Update Company' : 'Register Company'}
      </button>
    </form>
  );
};