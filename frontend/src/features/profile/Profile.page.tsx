import React, { useState, useEffect } from 'react';
import { BasicInfoForm } from './components/BasicInfoForm.component';
import { PasswordForm }   from './components/PasswordForm.component';
import { getProfileDetails, updateProfileDetails, updateProfilePassword } from './Profile.service';
import { useLoader } from '../../context/LoaderContext';

export const Profile = () => {
  const { showLoader, hideLoader } = useLoader();

  const [profile, setProfile] = useState({ username: '', email: '' });
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState({ profile: '', password: '' });

  // ─── Fetch on mount ───────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        showLoader();
        const data = await getProfileDetails();
        if (data?.success) {
          setProfile({
            username: data.data[0].username,
            email:    data.data[0].email,
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        hideLoader();
      }
    };
    fetchProfile();
  }, []);

  // ─── Handlers ─────────────────────────────────────────────
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage((prev) => ({ ...prev, profile: '' }));
    try {
      showLoader();
      const data = await updateProfileDetails(profile);
      if (data?.success) {
        setMessage((prev) => ({ ...prev, profile: 'Profile updated successfully.' }));
      }
    } catch {
      setMessage((prev) => ({ ...prev, profile: 'Failed to update profile.' }));
    } finally {
      hideLoader();
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage((prev) => ({ ...prev, password: '' }));
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage((prev) => ({ ...prev, password: 'Passwords do not match.' }));
      return;
    }
    try {
      showLoader();
      const data = await updateProfilePassword(passwords);
      if (data?.success) {
        setMessage((prev) => ({ ...prev, password: 'Password updated successfully.' }));
        setPasswords({ newPassword: '', confirmPassword: '' });
      }
    } catch {
      setMessage((prev) => ({ ...prev, password: 'Failed to update password.' }));
    } finally {
      hideLoader();
    }
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto pb-10 px-4 pt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Account Settings</h1>

      <div className="md:col-span-2 space-y-6">
        <BasicInfoForm
          profile={profile}
          message={message.profile}
          onSubmit={handleUpdateProfile}
          onChange={(field, value) => setProfile((prev) => ({ ...prev, [field]: value }))}
        />

        <PasswordForm
          passwords={passwords}
          message={message.password}
          onSubmit={handleUpdatePassword}
          onChange={(field, value) => setPasswords((prev) => ({ ...prev, [field]: value }))}
        />
      </div>
    </div>
  );
};