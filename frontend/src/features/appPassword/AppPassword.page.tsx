import React, { useState, useEffect } from 'react';
import StepCard from './components/StepCard.component';
import PasswordForm from './components/PasswordForm.component';
import ConfigDisplay from './components/ConfigDisplay.component';
import { getConfig, storeConfig } from './AppPassword.service'; // Import your functions
import { useAuth } from '../../context/AuthContext';

const steps = [
  { id: 1, title: "Enable 2FA", desc: "Go to Google Security and turn on 2-Step Verification.", link: "https://myaccount.google.com/security" },
  { id: 2, title: "Search App Passwords", desc: "Search 'App Passwords' in the Google Account search bar." },
  { id: 3, title: "Generate & Copy", desc: "Name it (e.g., 'EmailApp') and copy the 16-character code." }
];

const AppPasswordPage: React.FC = () => {
  const { refreshRedirection } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch config from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConfig();
        // Check if app_email exists in the response
        if (response?.data[0]?.app_email) {
          setEmail(response.data[0].app_email);
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
      } catch (error) {
        console.error("Failed to fetch config", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Handle Submit to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const response = await storeConfig(payload);

      if (response?.success) {
        setIsRegistered(true);
        setIsEditing(false);
        setPassword(''); // Always clear password after success
        await refreshRedirection();
      }
    } catch (error) {
      console.error("Storage failed", error);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Checking configuration...</div>;
  }

  return (
    <div className="w-full min-h-full p-6 font-sans md:p-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Email SMTP Setup</h1>
        <p className="text-slate-500 mt-1 text-sm">Follow the steps to authorize 500 emails/day via Gmail.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Step Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-4">
          {(!isRegistered || isEditing) ? (
            <>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Setup Instructions</h3>
              {steps.map((step) => (
                <StepCard key={step.id} {...step} />
              ))}
            </>
          ) : (
            <div className="p-10 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mb-4 shadow-lg">✓</div>
              <h3 className="text-xl font-bold text-slate-800">System Ready</h3>
              <p className="text-slate-600 max-w-xs mt-2">Your Gmail configuration is active. You can now send automated emails.</p>
            </div>
          )}
        </div>

        {/* Right Side: Form or Display */}
        <div className="lg:col-span-5 lg:sticky lg:top-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">
              {isRegistered && !isEditing ? "Current Config" : (isEditing ? "Update Credentials" : "Register Credentials")}
            </h2>

            {isRegistered && !isEditing ? (
              <ConfigDisplay email={email} onEdit={() => setIsEditing(true)} />
            ) : (
              <PasswordForm 
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={handleSubmit}
                isEditing={isEditing}
                onCancel={() => setIsEditing(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPasswordPage;