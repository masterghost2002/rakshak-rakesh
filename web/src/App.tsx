import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/public.layout";
import ProtectedLayout from "./layouts/protected.layout";
import Dashboard from "./pages/dashboard.page";
import SignIn from "./pages/sign-in.page";
import SignUp from "./pages/sign-up.page";
function App() {
  return (
    <Routes>
      <Route path='/welcome' element={<PublicLayout />}>
        <Route path='sign-in' element={<SignIn />} />
        <Route path="sign-up" element={<SignUp/>}/>
      </Route>
      <Route path='/' element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
