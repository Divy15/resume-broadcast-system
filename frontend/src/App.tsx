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

function App() {
  return (
    <>
      <AuthProvider>
        <LoaderProvider>
          <BrowserRouter>
            <Navbar />
            <Toaster position="top-right"  />
            <main className=" bg-gray-50 mt-9 p-5">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

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
              </Routes>
            </main>
          </BrowserRouter>
        </LoaderProvider>
      </AuthProvider>
    </>
  );
}

export default App;
