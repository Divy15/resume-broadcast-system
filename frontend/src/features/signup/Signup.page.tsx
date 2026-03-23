import React, { useState } from "react";
import { User, Mail, Lock, Globe, Calendar, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { FormDataState } from "./types";
import { storeUserData } from "./Signup.service";
import toast from "react-hot-toast";
import { useLoader } from "../../context/LoaderContext";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const {showLoader, hideLoader} = useLoader();
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    dob: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Frontend validation before API call
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        showLoader();

        try {
            const response = await storeUserData(formData);

            if (response?.success) {
                toast.success("Account created! Please log in.");
                navigate("/login");
            }

        } catch (error: any) {
            // ✅ Show exact error message from backend
            toast.error(error.message || "Signup failed. Please try again.");
        } finally {
            hideLoader();
        }
    };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">
            Join PitchHR to start managing your career
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Name */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Country
            </label>
            <div className="relative mt-1">
              <Globe
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                required
                placeholder="India"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Date of Birth
            </label>
            <div className="relative mt-1">
              <Calendar
                className="absolute left-3 top-3 text-gray-400 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                placeholder="DD / MM / YYYY"
                required
                maxLength={14}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all"
                value={formData.dob}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, ""); // Remove all non-digits
                  let formatted = "";

                  // Logic to add slashes automatically
                  if (val.length > 0) {
                    formatted += val.substring(0, 2);
                    // If user has typed 2 digits, add the slash immediately
                    if (val.length >= 2) {
                      formatted += "/";
                    }
                    if (val.length > 2) {
                      formatted += val.substring(2, 4);
                    }
                    // If user has typed 4 digits total, add the second slash immediately
                    if (val.length >= 4) {
                      formatted += "/";
                    }
                    if (val.length > 4) {
                      formatted += val.substring(4, 8);
                    }
                  }

                  setFormData({ ...formData, dob: formatted });
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <UserPlus size={20} /> Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
