import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/public.layout";
import ProtectedLayout from "./layouts/protected.layout";
import Dashboard from "./pages/dashboard.page";
import SignIn from "./pages/sign-in.page";
import SignUp from "./pages/sign-up.page";
import EditProfile from "./pages/edit.profile.page";
import GuidelinePage from "./pages/guidlines.page";
import NewAssessmentsPage from "./pages/new-assessement.page";
import ResultPage from "./pages/result.page";
import LicencePage from "./pages/licence.page";
import LicencePdfPage from "./pages/licence-pdf.page";
function App() {
  return (
    <Routes>
      <Route path='/welcome' element={<PublicLayout />}>
        <Route path='sign-in' element={<SignIn />} />
        <Route path="sign-up" element={<SignUp/>}/>
      </Route>
      <Route path='/' element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="edit-profile" element={<EditProfile/>}/>
        <Route path="guidelines" element={<GuidelinePage/>}/>
        <Route path="new-assessement" element={<NewAssessmentsPage/>}/>
        <Route path="result" element={<ResultPage/>}/>
        <Route path="licence" element={<LicencePage/>}/>
        <Route path="licence-pdf" element={<LicencePdfPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
