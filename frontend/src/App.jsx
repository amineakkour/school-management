import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./views/student/StudentLogin";
import TeacherLogin from "./views/teacher/TeacherLogin";
import AdminLogin from "./views/admin/AdminLogin";
import GuestHome from "./views/Home";
import Blog from "./views/Blog";
import MainLayout from "./Layout/MainLayout";
import AboutUs from "./views/AboutUs";
import PageNotFound from "./views/PageNotFound";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<GuestHome />} />
          <Route path="blog" element={<Blog />} />
          <Route path="a-propos-de-nous" element={<AboutUs />} />
        </Route>

        <Route path="connexion">
          <Route path="etudiant" element={<StudentLogin />} />
          <Route path="enseignant" element={<TeacherLogin />} />
          <Route path="adminstrateur" element={<AdminLogin />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
