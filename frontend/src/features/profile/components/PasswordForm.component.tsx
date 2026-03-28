import React from 'react';
import { Lock } from 'lucide-react';

interface Props {
  passwords:  { newPassword: string; confirmPassword: string };
  message:    string;
  onSubmit:   (e: React.FormEvent) => void;
  onChange:   (field: string, value: string) => void;
}

export const PasswordForm = ({ passwords, message, onSubmit, onChange }: Props) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Lock size={18} className="text-red-500" /> Security
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={passwords.newPassword}
              onChange={(e) => onChange('newPassword', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={passwords.confirmPassword}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
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
          className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition-all"
        >
          Save Password
        </button>
      </div>
    </form>
  );
};