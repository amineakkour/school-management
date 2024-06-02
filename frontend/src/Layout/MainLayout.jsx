import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="max-w-screen-2xl mx-auto relative">
      <Navbar />
  
      <main className="max-w-6xl mt-10 md:mt-20 md:p-5 mx-2 md:mx-auto min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}