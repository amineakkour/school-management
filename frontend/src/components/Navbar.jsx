import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

const colorsOmg = ['text-blue-500', 'text-red-500', 'text-yellow-500',   'text-green-500', 'text-orange-500',];

const navItems = [
  {label: `Acceuil`, fontAwsomeIconClass: 'fa-solid fa-house', path: "/"},
  {label: "Blog", fontAwsomeIconClass: 'fa-brands fa-blogger-b', path: "/blog"},
  {label: "A propos de nous", fontAwsomeIconClass: 'fa-regular fa-address-card', path: "/a-propos-de-nous"},
  {label: "Service à la clintèle", fontAwsomeIconClass: 'fa-regular fa-circle-down', path: "/"},
  {label: "Connexion", fontAwsomeIconClass: 'fa-solid fa-unlock-keyhole', path: "/connexion/etudiant"},
]

function BurgerMenu({isOpen, setIsOpen}) {
  const genericHamburgerLine = `h-1 w-7 my-1 bg-black transition ease transform duration-300`;

  return (
    <button className="z-[100] flex flex-col justify-center items-center md:hidden" onClick={() => setIsOpen(!isOpen)}>
      <div className={`${genericHamburgerLine} ${isOpen ? "rotate-45 translate-y-3 bg-blue-400" : "bg-green-600" }`} />
      <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "bg-purple-700"}`} />
      <div className={`${genericHamburgerLine} ${ isOpen ? "-rotate-45 -translate-y-3 bg-blue-400" : "bg-orange-400" }`}/>
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(!(window.innerWidth < 760)); // if widown smaller than 600 then set isOpen to false 
  
  return (
  <nav id="nav-bar" className={`overflow-hidden block md:flex justify-between items-center px-5 md:px-10 relative`}>  
    <div className="absolute right-3 top-4">
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
    <div className="w-16 h-full">
      <img src={logo} alt="Logo" className="left-to-right" />
    </div>

    <ul className={`right-to-left gap-3 block md:flex ${isOpen ? "" : "h-0"} overflow-hidden `}>
      {navItems.map((item, ind) => <li className="pop-up bg-red- my-3" key={ind}><Link className={`${colorsOmg[ind]} hover:text-purple-500`} to={item.path}><i className={`inline-block min-w-5 text-center ${item.fontAwsomeIconClass}`}></i> {item.label}</Link></li>)}

      <ModeToggle />
    </ul>
  </nav>
  )
}