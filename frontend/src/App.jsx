import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./views/student/StudentLogin";
import TeacherLogin from "./views/teacher/TeacherLogin";
import AdminLogin from "./views/admin/AdminLogin";
import Home from "./views/guest/Home";
import Blog from "./views/guest/Blog";
import MainLayout from "./Layout/MainLayout";
import AboutUs from "./views/guest/AboutUs";
import PageNotFound from "./views/guest/PageNotFound";
import { ThemeProvider } from "./context/ThemeProvider";
import Payment from "./views/guest/Payment";


function App() {

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="a-propos-de-nous" element={<AboutUs />} />
          </Route>

          <Route path="payer-frais" element={<Payment />} />
          
          <Route path="connexion">
            <Route index  element={<StudentLogin />} />
            <Route path="etudiant" element={<StudentLogin />} />
            <Route path="enseignant" element={<TeacherLogin />} />
            <Route path="adminstrateur" element={<AdminLogin />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
