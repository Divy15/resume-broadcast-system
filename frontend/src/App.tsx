import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HRDashboardPage } from "./features/hrInfoManagement/HRDashboard/HRDashboard.page"
import { HRInfoFormPage } from "./features/hrInfoManagement/HrForm/HRInfoForm.page"
import { TemplateSelection } from "./features/hrInfoManagement/HRTemplateSelection/TemplateSelection.page"
import { EmailJobs } from "./features/emailJobs/EmailJobs.page"
import Navbar from "./features/navbar/Navbar.page"
import EmailTemplateListPage from "./features/emailTemplate/templateList/EmailTemplateList.page"
import EmailTemplateEditor from "./features/emailTemplate/templateEditor/EmailTemplateEditor.page"
import { AuthProvider } from "./context/AuthContext"
import Login from "./features/login/Login.page"
import Signup from "./features/signup/Signup.page"
import Home from "./features/home/Home.page"


function App() {

  return (
    <>
    <AuthProvider >
      <BrowserRouter>
      <Navbar />
      <main className="min-h-auto bg-gray-50">
        <Routes>
          <Route path="/hr/manager" element={<HRDashboardPage />} />
          <Route path="/hr/add" element={<HRInfoFormPage />} />
          <Route path="/template/selection" element={<TemplateSelection />} />
          <Route path="/email/jobs" element={<EmailJobs />} />
          <Route path="/templates" element={<EmailTemplateListPage />} />
          <Route path="/templates/new" element={<EmailTemplateEditor />} />
          <Route path="/templates/edit/:id" element={<EmailTemplateEditor />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
