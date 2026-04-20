import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HRDashboardPage } from "./features/hrInfoManagement/HRDashboard/HRDashboard.page";
import { HRInfoFormPage } from "./features/hrInfoManagement/HrForm/HRInfoForm.page";
import { TemplateSelection } from "./features/hrInfoManagement/HRTemplateSelection/TemplateSelection.page";
import { EmailJobs } from "./features/emailJobs/EmailJobs.page";
import Navbar from "./features/navbar/Navbar.page";
import EmailTemplateListPage from "./features/emailTemplate/templateList/EmailTemplateList.page";
import EmailTemplateEditor from "./features/emailTemplate/templateEditor/EmailTemplateEditor.page";
import { AuthProvider } from "./context/AuthContext";
import Login from "./features/login/Login.page";
import Signup from "./features/signup/Signup.page";
import Home from "./features/home/Home.page";
import AppPasswordPage from "./features/appPassword/AppPassword.page";
import { LoaderProvider } from "./context/LoaderContext";
import { ProtectedRoute } from "./features/CommonComponent/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import { Dashboard } from "./features/dashboard/Dashboard.page";
import { Profile } from "./features/profile/Profile.page";
import { PublicRoute } from "./features/CommonComponent/PublicRoute";
import { EditHrForm } from "./features/hrInfoManagement/HRDashboard/components/EditHrForm";
import { CompanyRegistrationPage } from "./features/companyRegistration/CompanyRegistration.page";

function App() {
  return (
    <>
      <AuthProvider>
        <LoaderProvider>
          <BrowserRouter>
            <Navbar />
            <Toaster position="top-right"  />
            <main className="min-h-full mt-9">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

                {/* Root redirect - triggers auth check */}
                <Route
                  path="/redirect"
                  element={
                    <ProtectedRoute>
                      <></>
                    </ProtectedRoute>
                  }
                />



                {/* ✅ Protected routes - all wrapped */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hr/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditHrForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hr/manager"
                  element={
                    <ProtectedRoute>
                      <HRDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hr/add"
                  element={
                    <ProtectedRoute>
                      <HRInfoFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/template/selection"
                  element={
                    <ProtectedRoute>
                      <TemplateSelection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/email/jobs"
                  element={
                    <ProtectedRoute>
                      <EmailJobs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/templates"
                  element={
                    <ProtectedRoute>
                      <EmailTemplateListPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/templates/new"
                  element={
                    <ProtectedRoute>
                      <EmailTemplateEditor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/templates/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EmailTemplateEditor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/email/config"
                  element={
                    <ProtectedRoute>
                      <AppPasswordPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/company/registration"
                  element={
                    <ProtectedRoute>
                      <CompanyRegistrationPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </BrowserRouter>
        </LoaderProvider>
      </AuthProvider>
    </>
  );
}

export default App;
