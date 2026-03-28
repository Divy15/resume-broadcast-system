import React from 'react';
import { Mail, User, Save } from 'lucide-react';

interface Props {
  profile:      { username: string; email: string };
  message:      string;
  onSubmit:     (e: React.FormEvent) => void;
  onChange:     (field: string, value: string) => void;
}

export const BasicInfoForm = ({ profile, message, onSubmit, onChange }: Props) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <User size={18} className="text-blue-500" /> Basic Information
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={profile.username}
            onChange={(e) => onChange('username', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={profile.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </div>
        </div>

        {message && (
          <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 transition-all"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>
    </form>
  );
};