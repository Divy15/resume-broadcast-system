import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HRDashboardPage } from "./features/hrInfoManagement/HRDashboard/HRDashboardPage"
import { HRInfoFormPage } from "./features/hrInfoManagement/HrForm/HRInfoFormPage"


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HRDashboardPage />}/>
        <Route path="/hr/add" element={<HRInfoFormPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
