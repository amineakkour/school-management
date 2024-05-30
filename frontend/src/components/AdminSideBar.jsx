import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Home, LayoutDashboard, CreditCard, HandCoins, SquarePen, BookOpenCheck, Library, BellElectric, User, MessageSquareMore, PenLine } from "lucide-react";


export default function AdminSideBar() {
  const initialSideBareWidth = 80;
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(initialSideBareWidth);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      if (e.clientX > 200) return setSidebarWidth(200);
      if (e.clientX < 10) return setSidebarWidth(10);
      setSidebarWidth(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);
  
  return (
    <div className="relative left-to-right">
      <nav className="bg-stone-900 text-stone-100 shrink-0 overflow-hidden h-full min-h-screen" style={{ width: `${sidebarWidth}px` }}>
        <ul className={`flex flex-col justify-center ${sidebarWidth <= initialSideBareWidth ? "items-center" : "items-start"} py-5 px-3 md:px-5 gap-4`}>  
          <li title="Accueil">
            <Link className="flex items-center gap-1 hover:opacity-70"><Home className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Accuiel</span>}</Link>
          </li>

          <li title="Dashboard">
            <Link className="flex items-center gap-1 hover:opacity-70"><LayoutDashboard className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Dashboard</span>}</Link>
          </li>

          <li title="Comptes">
            <Link className="flex items-center gap-1 hover:opacity-70"><User className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Comptes</span>}</Link>
          </li>

          <li title="Messages">
            <Link className="flex items-center gap-1 hover:opacity-70"><MessageSquareMore className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Messages</span>}</Link>
          </li>

          <li title="E-payment">
            <Link className="flex items-center gap-1 hover:opacity-70"><CreditCard className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">E-paiement</span>}</Link>
          </li>

          <li title="Paiement">
            <Link className="flex items-center gap-1 hover:opacity-70"><HandCoins  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Paiement</span>}</Link>
          </li>

          <li title="Emplois">
            <Link className="flex items-center gap-1 hover:opacity-70"><BellElectric  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Emplois</span>}</Link>
          </li>

          <li title="Blogs">
            <Link className="flex items-center gap-1 hover:opacity-70"><PenLine className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Blogs</span>}</Link>
          </li>

          <li title="Absence">
            <Link className="flex items-center gap-1 hover:opacity-70"><SquarePen  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Absence</span>}</Link>
          </li>

          <li title="Exams">
            <Link className="flex items-center gap-1 hover:opacity-70"><Library  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Exams</span>}</Link>
          </li>

          <li title="Notes  ">
            <Link className="flex items-center gap-1 hover:opacity-70"><BookOpenCheck  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Notes</span>}</Link>
          </li>
          
        </ul>
      </nav>
      <div className="h-full w-1 bg-stone-700 absolute top-0 right-0">
        <div className="h-full w-full p-2 cursor-ew-resize active:bg-gray-100" onMouseDown={handleMouseDown}></div>
      </div>
    </div>
  );
}