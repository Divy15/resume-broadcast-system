import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HRDashboardPage } from "./features/hrInfoManagement/HRDashboard/HRDashboard.page"
import { HRInfoFormPage } from "./features/hrInfoManagement/HrForm/HRInfoForm.page"
import { TemplateSelection } from "./features/hrInfoManagement/HRTemplateSelection/TemplateSelection.page"


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HRDashboardPage />}/>
        <Route path="/hr/add" element={<HRInfoFormPage />} />
        <Route path="/template/selection" element={<TemplateSelection />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
