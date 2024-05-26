import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, LayoutDashboard, CreditCard, HandCoins, SquarePen, BookOpenCheck, Library, BellElectric, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Profile() {
  return (
    <div className='flex items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Photo de Profile</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mme. El Motawakil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs cursor-pointer">Mon Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-xs cursor-pointer">Deconnexion</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function Sidebar({ dashboardEl }) {
  const initialSideBareWidth = 80;
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(initialSideBareWidth);

  const handleMouseDown = (e) => {
    console.log("Hello");
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
    const currentDashboardEl = dashboardEl.current;
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);
  
  return (
    <div className="relative">
      <nav className="bg-stone-900 text-stone-100 shrink-0 overflow-hidden h-full" style={{ width: `${sidebarWidth}px` }}>
        <ul className={`flex flex-col justify-center ${sidebarWidth <= initialSideBareWidth ? "items-center" : "items-start"} py-5 px-3 md:px-5 gap-4`}>  
          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><Home className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Accuiel</span>}</Link>
          </li>

          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><LayoutDashboard className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Dashboard</span>}</Link>
          </li>

          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><User className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Comptes</span>}</Link>
          </li>

          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><CreditCard className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">E-paiement</span>}</Link>
          </li>

          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><HandCoins  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Paiement</span>}</Link>
          </li>

          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><BellElectric  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Emplois</span>}</Link>
          </li>

          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><SquarePen  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Absence</span>}</Link>
          </li>

          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><Library  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Exams</span>}</Link>
          </li>

          <li className="">
            <Link class="flex items-center gap-1 hover:opacity-70"><BookOpenCheck  className="shrink-0" /> {sidebarWidth > initialSideBareWidth && <span className="text-xs whitespace-nowrap">Notes</span>}</Link>
          </li>
          
        </ul>
      </nav>
      <div className="h-full w-1 bg-stone-700 absolute top-0 right-0">
        <div className="h-full w-full p-2 cursor-ew-resize active:bg-gray-100" onMouseDown={handleMouseDown}></div>
      </div>
    </div>
  );
}

function Card({ children, title, handelClickOnSettings }) {
  return (
    <div className="w-full shadow-xl p-2 md:p-5 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          <i class="fa-solid fa-ellipsis-vertical cursor-pointer p-2" onClick={handelClickOnSettings}></i>
      </div>
      {children}
    </div>
  )
}

export default function AdminDashboard() {
  const dashboardEl = useRef(null);
  var [frenchDate, setFrenchDate] = useState(null);

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    setFrenchDate(date.toLocaleDateString('fr-FR', options));
  }, [])

  return (
    <div ref={dashboardEl} className="flex max-w-screen-2xl mx-auto">
      <Sidebar dashboardEl={dashboardEl} />
      <div className="m-4 w-full md:px-10">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-2xl font-1">Heureux de vous revoir!</h4>
            <div className="text-xs text-gray-500">{frenchDate}</div>
          </div>
          <div><Profile /></div>
        </div>

        <div className="mt-5">
          
          <div className="grid md:grid-cols-3 gap-5">
            <Card title={"Etudiants"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <p className="text-lg font-semibold">370/400 <span className="text-xs">comptes</span></p>
              <div><Link className="link-1" to="">Créer compte</Link></div>
            </Card>
            
            <Card title={"Enseignants"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <p className="text-lg font-semibold">25/400 <span className="text-xs">comptes</span></p>
              <div><Link className="link-1" to="">Créer compte</Link></div>
            </Card>

            <Card title={"Adminstrateur"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <p className="text-lg font-semibold">5/400 <span className="text-xs">comptes</span></p>
              <div><Link className="link-1" to="">Créer compte</Link></div>
            </Card>

          </div>

          <div className="my-8">
            <Card title={"Paiements non vérifié"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <table class="tabel-1 mt-2 md:mt-4 text-[9px] md:text-xs">
                <thead>
                  <tr>
                    <th>Nom Complet</th>
                    <th>Date de Paimenet</th>
                    <th>Tranche</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>Amine Akkour</td>
                    <td>2023/09/01</td>
                    <td>5</td>
                    <td>5000 Dhs</td>
                    <td><Link to="">Afficher</Link></td>
                  </tr>

                  <tr>
                    <td>Amine Akkour</td>
                    <td>2023/09/01</td>
                    <td>5</td>
                    <td>5000 Dhs</td>
                    <td><Link to="">Afficher</Link></td>
                  </tr>

                  <tr>
                    <td>Amine Akkour</td>
                    <td>2023/09/01</td>
                    <td>5</td>
                    <td>5000 Dhs</td>
                    <td><Link to="">Afficher</Link></td>
                  </tr>

                  <tr>
                    <td>Amine Akkour</td>
                    <td>2023/09/01</td>
                    <td>5</td>
                    <td>5000 Dhs</td>
                    <td><Link to="">Afficher</Link></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          <div className="my-8">
            <Card title={"Derniers Messages"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <ul className="text-base mt-2 md:mt-4 text-[11px] md:text-xs">
                <li className="px-1 py-2 my-1 bg-stone-50 hover:underline">
                  <Link to="" className="flex items-center gap-5 ">
                    <div className=''>25-09-2012</div>
                    <h5 className="">Lorem ipsum dolor sit amet.</h5>
                  </Link>
                </li>

                <li className="px-1 py-2 my-1 bg-stone-100 hover:underline">
                  <Link to="" className="flex items-center gap-5 ">
                    <div className=''>25-09-2012</div>
                    <h5 className="">Lorem ipsum dolor sit amet.</h5>
                  </Link>
                </li>

                <li className="px-1 py-2 my-1 bg-stone-50 hover:underline">
                  <Link to="" className="flex items-center gap-5 ">
                    <div className=''>25-09-2012</div>
                    <h5 className="">Lorem ipsum dolor sit amet.</h5>
                  </Link>
                </li>

                <li className="px-1 py-2 my-1 bg-stone-100 hover:underline">
                  <Link to="" className="flex items-center gap-5 ">
                    <div className=''>25-09-2012</div>
                    <h5 className="">Lorem ipsum dolor sit amet.</h5>
                  </Link>
                </li>

              </ul>
            </Card>
          </div>


        </div>
      </div>
    </div>
  );
}
