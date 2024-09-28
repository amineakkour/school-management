import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Home, LayoutDashboard, CreditCard, HandCoins, SquarePen, BookOpenCheck, Library, BellElectric, User, MessageSquareMore, PenLine } from "lucide-react";


const AdminSideBarItems = [
  {
    title: "Acceuil", 
    icon: <Home className="shrink-0"/>,
    path: '/', 
  }, 
  {
    icon: <span className="mb-5"></span>
  },
  {
    title: 'Dashboard', 
    icon: <LayoutDashboard className="shrink-0"/>,
    path: '/adminstrateur/tableau-de-bord', 
  }, 
  {
    title: 'Comptes', 
    icon: <User className="shrink-0"/>,
    path: '/adminstrateur/comptes', 
  }, 
  {
    title: 'Messages', 
    icon: <MessageSquareMore className="shrink-0"/>,
    path: '/adminstrateur/messages', 
  }, 
  {
    title: 'E-payment', 
    icon: <CreditCard className="shrink-0"/>,
    path: '/adminstrateur/e-paiement', 
  }, 
  {
    title: 'Paiement', 
    icon: <HandCoins className="shrink-0"/>,
    path: '/adminstrateur/paiement', 
  },
  {
    title: 'Blogs', 
    icon: <PenLine className="shrink-0"/>,
    path: '/adminstrateur/blogs', 
  },
  {
    title: 'Emplois', 
    icon: <BellElectric className="shrink-0"/>,
    path: '/adminstrateur/emplois-de-temps', 
  },
  {
    title: 'Absence', 
    icon: <SquarePen className="shrink-0"/>,
    path: '/adminstrateur/absence', 
  },
  {
    title: 'Exams', 
    icon: <Library className="shrink-0"/>,
    path: '/adminstrateur/exams', 
  },
  {
    title: 'Notes', 
    icon: <BookOpenCheck className="shrink-0"/>,
    path: '/adminstrateur/notes', 
  },
]


export default function AdminSideBar({ activeItem = 2}) {
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
    <div className="relative">
      <nav className="bg-black text-stone-100 shrink-0 overflow-hidden h-full min-h-screen" style={{ width: `${sidebarWidth}px` }}>
        <ul className={`flex flex-col justify-center ${sidebarWidth <= initialSideBareWidth ? "items-center" : "items-start"} py-5 px-3 md:px-5 gap-4`}>  
          
          {AdminSideBarItems.map((item, ind) => {
            return (
              <li key={ind} className={`${ind == activeItem ? 'bg-stone-100 text-stone-900' : ''} rounded-md p-1`} title={item.title}>
                <Link to={item.path} className="flex items-center gap-1 hover:opacity-70">{item.icon} {(sidebarWidth > initialSideBareWidth) && <span className="text-xs whitespace-nowrap">{item.title}</span>}</Link>
              </li>
            )
          }
          )}
        </ul>
      </nav>
      <div className="h-full w-1 bg-stone-700 absolute top-0 right-0">
        <div className="h-full w-full p-2 cursor-ew-resize active:bg-gray-100" onMouseDown={handleMouseDown}></div>
      </div>
    </div>
  );
}