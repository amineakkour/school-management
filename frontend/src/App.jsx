import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./views/student/StudentLogin";
import TeacherLogin from "./views/teacher/TeacherLogin";
import AdminLogin from "./views/admin/AdminLogin";
import Home from "./views/guest/Home";
import Contact from "./views/guest/Contact";
import PreRegister from "./views/guest/PreRegister";
import Blog from "./views/guest/Blog";
import MainLayout from "./Layout/MainLayout";
import AboutUs from "./views/guest/AboutUs";
import PageNotFound from "./views/guest/PageNotFound";
import { ThemeProvider } from "./context/ThemeProvider";
import Payment from "./views/guest/Payment";
import AdminDashboard from "./views/admin/AdminDashboard";
import StudentDashboard from "./views/student/StudentDashboard";
import AdminLayout from "./Layout/AdminLayout";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import StudentLayout from "./Layout/StudentLayout";
import AdminBlogs from "./views/admin/AdminBlogs";
import EditBlog from "./views/admin/EditBlog";
import AddNewBlog from "./views/admin/AddNewBlog";
import Accounts from "./views/admin/Accounts";
import Schedule from "./views/admin/Schedule";
import Messages from "./views/admin/Messages";
import EPayement from "./views/admin/EPayement";
import AdminPayement from "./views/admin/Payement";
import Absences from "./views/admin/Absences";
import Exams from "./views/admin/Exams";
import Notes from "./views/admin/Notes";
import AdminProfile from "./views/admin/AdminProfile";

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          
          {/* guests */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="pre-inscription" element={<PreRegister />} />
            <Route path="a-propos-de-nous" element={<AboutUs />} />
          </Route>

          <Route path="payer-frais" element={<Payment />} />
          
          {/* login */}
          <Route path="connexion">
            <Route index element={<StudentLogin />} />
            <Route path="etudiant" element={<StudentLogin />} />
            <Route path="enseignant" element={<TeacherLogin />} />
            <Route path="adminstrateur" element={<AdminLogin />} />
          </Route>

          {/* admins */}
          <Route path="adminstrateur" element={<AdminLayout />}>
            <Route path="tableau-de-bord" element={<AdminDashboard />} />

            <Route path="blogs" >
              <Route index element={<AdminBlogs />} />
              <Route path="ajouter" element={<AddNewBlog />} />
              <Route path="modifier/:id" element={<EditBlog />} />
            </Route>

            <Route path="profile" element={<AdminProfile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="comptes" element={<Accounts />} />
            <Route path="emplois-de-temps" element={<Schedule />} />
            <Route path="e-paiement" element={<EPayement />} />
            <Route path="paiement" element={<AdminPayement />} />
            <Route path="absence" element={<Absences />} />
            <Route path="exams" element={<Exams />} />
            <Route path="notes" element={<Notes />} />

          </Route>

          {/* stuents */}
          <Route path="etudiant" element={<StudentLayout />}>
            <Route path="tableau-de-bord" element={<StudentDashboard />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
