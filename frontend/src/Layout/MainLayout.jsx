import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
  
      <main className="md:max-w-6xl mt-10 md:mt-20 md:p-5 mx-2 md:mx-auto">
        <Outlet />
      </main>
    </div>
  );
}