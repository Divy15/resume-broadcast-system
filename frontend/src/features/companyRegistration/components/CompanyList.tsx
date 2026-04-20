import React from 'react';
import type { Company } from '../types/index';

interface CompanyListProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({ companies, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Company Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Website</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{company.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {company.website}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <button onClick={() => onEdit(company)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => onDelete(company.id)} className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
          {companies.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-slate-500">No companies registered yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};