import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HRDashboardPage } from "./features/hrInfoManagement/HRDashboard/HRDashboard.page"
import { HRInfoFormPage } from "./features/hrInfoManagement/HrForm/HRInfoForm.page"
import { TemplateSelection } from "./features/hrInfoManagement/HRTemplateSelection/TemplateSelection.page"
import { EmailJobs } from "./features/emailJobs/EmailJobs.page"
import Navbar from "./features/navbar/Navbar.page"
import EmailTemplateListPage from "./features/emailTemplate/templateList/EmailTemplateList.page"
import EmailTemplateEditor from "./features/emailTemplate/templateEditor/EmailTemplateEditor.page"


function App() {

  return (
    <>
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
        </Routes>
      </main>
      </BrowserRouter>
    </>
  )
}

export default App
