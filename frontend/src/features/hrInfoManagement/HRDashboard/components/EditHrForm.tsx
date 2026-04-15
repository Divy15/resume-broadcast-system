// EditHrForm.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, ErrorMessage, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast'; // Assuming you use react-hot-toast for feedback
import { ArrowLeft, ExternalLink, Loader2, Trash2 } from 'lucide-react'; // Example icons

import { HRDashboardService } from '../HRDashboard.service'; // Update path
import type { HRInformation, UpdateHRInformationAPIProps } from '../types/dashboard.types'; // Update path
import { StatusBadge } from '../../../CommonComponent/StatusBadge';

// --- 1. Validation Schema (Yup) ---
const validationSchema = Yup.object({
  company_name: Yup.string().required('Company name is required'),
  hr_name: Yup.string().required('HR name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  mobileno: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be at least 10 digits'),
  // Ensure string() is called, nullable() allows null/empty initial values, url() validates if text is entered
  company_website: Yup.string().required(),
  hr_linkedin_profile_link: Yup.string().required(),
});

// --- 2. Enhanced FormInput Helper ---
// We use useFormikContext() to check validity without accessing the raw Yup schema.
const FormInput = ({ label, Icon, readOnly = false, helpText, className = "", ...props }: any) => {
  const [field, meta] = useField(props); 
  const { validateField } = useFormikContext<UpdateHRInformationAPIProps>(); // Access formik context
  const [fieldIsValid, setFieldIsValid] = useState(false);

  const hasError = meta.touched && meta.error;

  // Real-time validation check for the icon (External Link)
  // This avoids the TypeScript error regarding isValidSync
  useEffect(() => {
    const checkValidity = async () => {
      if (field.value) {
        // Formik's validateField returns an error message string, or undefined if valid.
        const error = await validateField(props.name);
        setFieldIsValid(!error); // Valid if error is undefined
      } else {
        setFieldIsValid(false); // Consider invalid if empty
      }
    };
    
    checkValidity();
  }, [field.value, props.name, validateField]);

  return (
    <div className={`mb-5 ${className}`}>
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          {...field} // Spread formik field props (value, onChange, onBlur)
          {...props} // Spread incoming props (type, id, placeholder, readOnly, etc.)
          readOnly={readOnly}
          className={`block w-full rounded-lg border px-4 py-2.5 text-slate-900 transition-colors focus:ring-2 focus:ring-blue-200 outline-none text-sm
            ${readOnly
              ? 'bg-slate-100 border-slate-200 cursor-not-allowed text-slate-500'
              : 'border-slate-300 bg-white hover:border-slate-400 focus:border-blue-500'
            }
            ${hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}
          `}
        />
        {Icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {/* The Icon is a component/render prop. We pass it the calculated validity state. */}
            <Icon isValid={fieldIsValid} value={field.value} />
          </div>
        )}
      </div>
      {helpText && !hasError && <p className="mt-1 text-xs text-slate-500">{helpText}</p>}
      
      <ErrorMessage name={props.name} component="div" className="mt-1.5 text-xs text-red-600 font-medium" />
    </div>
  );
};

// --- 4. Main EditHrForm Component ---
export const EditHrForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<HRInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchHRDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await HRDashboardService.getHRInformation({ id: parseInt(id) });
        setInitialData(data.data[0]);
      } catch (error: any) {
        toast.error(error.message || "Failed to load HR details.");
        navigate('/hr/manager'); 
      } finally {
        setLoading(false);
      }
    };

    fetchHRDetails();
  }, [id, navigate]);

  // --- NEW: Handle Delete Function ---
  const handleDelete = async () => {
    if (!initialData?.id) return;

    // Standard confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${initialData.hr_name}? This action cannot be undone.`
    );

    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await HRDashboardService.deleteHRInformation({ id: initialData.id });
        toast.success("HR record deleted successfully");
        navigate('/hr/manager'); // Redirect to list after delete
      } catch (error: any) {
        toast.error(error.message || "Failed to delete the record");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Handle Submission
  const handleSubmit = async (values: UpdateHRInformationAPIProps, { setSubmitting }: any) => {
    try {
      await HRDashboardService.updateHRInformation(values);
      toast.success("HR information updated successfully!");
      navigate('/hr/manager'); 
    } catch (error: any) {
      toast.error(error.message || "Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center text-slate-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading HR details...
      </div>
    );
  }

  if (!initialData) return <div className="p-6 text-center text-red-500">Error: HR Data not found.</div>;

  // Prepare initial values
  const formInitialValues: UpdateHRInformationAPIProps = {
    id: initialData.id,
    company_name: initialData.company_name || '',
    hr_name: initialData.hr_name || '',
    email: initialData.email || '',
    mobileno: initialData.mobileno || '',
    company_website: initialData.company_website || '',
    hr_linkedin_profile_link: initialData.hr_linkedin_profile_link || '',
  };

  // Define how the External Link icons behave based on input validity
  const ExternalLinkIcon = ({ isValid, value }: { isValid: boolean; value: string }) => {
    if (value && isValid) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" title="Open Link" className="flex items-center">
          <ExternalLink className="h-4 w-4 text-blue-600 hover:text-blue-800" />
        </a>
      );
    }
    // Render a disabled or grayed-out version if invalid or empty
    return <ExternalLink className="h-4 w-4 text-slate-300 cursor-not-allowed" />;
  };

  return (
    <div className="w-full p-6 md:p-12 bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link to="/hr/manager" className="p-2 rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-950">
            Edit HR Information: <span className="font-medium text-slate-600">#{initialData.id}</span>
          </h1>
        </div>

      {/* --- DELETE BUTTON IN HEADER --- */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 border border-red-200 bg-white hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          <span className="text-sm font-semibold">Delete Record</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize 
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              
              {/* --- Read-only Section --- */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 p-5 mb-6 rounded-xl bg-slate-50 border border-slate-100">
                

                <div className="grid grid-cols-2 gap-4">
                    <StatusBadge label="Applied Status" value={initialData.is_applied} type="applied" />
                    <StatusBadge label="Verification" value={initialData.is_verified} type="verified" />
                </div>
              </div>

              {/* --- Changeable Fields --- */}
              <FormInput label="Company Name" name="company_name" placeholder="Acme Corp" />
              <FormInput label="HR Name" name="hr_name" placeholder="John Doe" />
              
              <FormInput label="Email Address" name="email" type="email" placeholder="john.doe@company.com" />
              <FormInput label="Mobile Number" name="mobileno" type="tel" placeholder="1234567890" />

              {/* Website with 'Open Link' */}
              <FormInput
                label="Company Website"
                name="company_website"
                placeholder="https://example.com"
                helpText="Must include http:// or https://"
                Icon={ExternalLinkIcon} // Use the defined Icon helper
              />

              {/* LinkedIn with 'Open Link' */}
              <FormInput
                label="HR LinkedIn Profile"
                name="hr_linkedin_profile_link"
                placeholder="https://linkedin.com/in/username"
                helpText="Must include http:// or https://"
                Icon={ExternalLinkIcon} // Use the defined Icon helper
              />

              {/* --- Form Actions --- */}
              <div className="md:col-span-2 flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/hr/manager"
                  className="px-6 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty} // Added !dirty check: cannot submit if no changes were made
                  className="flex items-center justify-center gap-2 px-10 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};