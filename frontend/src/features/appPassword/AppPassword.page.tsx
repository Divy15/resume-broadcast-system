import React, { useState } from 'react';
import StepCard from './components/StepCard.component';
import PasswordForm from './components/PasswordForm.component';

const steps = [
  { id: 1, title: "Enable 2FA", desc: "Go to Google Security and turn on 2-Step Verification." },
  { id: 2, title: "Search App Passwords", desc: "Search 'App Passwords' in the Google Account search bar." },
  { id: 3, title: "Generate", desc: "Give it a name (e.g., 'MyPortfolio') and copy the 16-character code." }
];

const AppPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save 'password' to your database via API
    console.log("Saving to DB:", password);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans max-h-auto">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Email SMTP Setup</h1>
        <p className="text-slate-500 mt-2">Follow these steps to authorize email sending.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {steps.map((step) => (
          <StepCard key={step.id} {...step} />
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Finalize Connection</h2>
        <PasswordForm 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
};

export default AppPasswordPage;