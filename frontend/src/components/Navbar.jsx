import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

const colorsOmg = ['text-blue-500', 'text-red-500', 'text-yellow-500',   'text-green-500', 'text-orange-500',];

const navItems = [
  {label: `Acceuil`, fontAwsomeIconClass: 'fa-solid fa-house', path: "/"},
  {label: "Blog", fontAwsomeIconClass: 'fa-brands fa-blogger-b', path: "/blog"},
  {label: "A propos de nous", fontAwsomeIconClass: 'fa-regular fa-address-card', path: "/a-propos-de-nous"},
  {label: "Connexion", fontAwsomeIconClass: 'fa-solid fa-unlock-keyhole', path: "/connexion/etudiant"},
  // {label: "Service à la clintèle", fontAwsomeIconClass: 'fa-regular fa-circle-down', path: "/"},
]

function DropDownItem() {
  const [isOpen, setIsOpen] = useState(false);
  const ulElement = useRef(null);
  
  const handleClickOutside = (event) => {
    if (ulElement.current && !ulElement.current.contains(event.target)) {
      setIsOpen(false);
      console.log("close")
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <li className="pop-up bg-red- my-3 text-orange-500 cursor-pointer relative drop-down-item" onClick={() => setIsOpen(v => !v)}>
      <span className="hover:text-purple-700">
        <i className={`inline-block min-w-5 text-center fa-regular fa-circle-down`}></i> Service à la clintèle
      </span>

      {isOpen && 
        <ul ref={ulElement} className="md:absolute p-2 w-full mt-2 up-to-down bg-secondary rounded-sm text-primary" style={{zIndex: "999"}}>
          <li className="hover:underline"><Link className="drop-down-item" to={"/"}>Payer Frais</Link></li>
          <li className="hover:underline"><Link className="drop-down-item" to={"/"}>Pre-Inscription</Link></li>
          <li className="hover:underline"><Link className="drop-down-item" to={"/"}>Nous contacter</Link></li>
        </ul> 
      }
    </li>
  )
}

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
  <nav id="nav-bar" className={`block md:flex justify-between items-center px-5 md:px-10 relative overflow-hidden md:overflow-visible`}>  
    <div className="absolute right-3 top-4">
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
    <div className="w-16 h-full">
      <img src={logo} alt="Logo" className="left-to-right" />
    </div>

    <ul className={`right-to-left gap-3 block md:flex ${isOpen ? "" : "h-0"}`}>
      {navItems.map((item, ind) => <li className="pop-up bg-red- my-3" key={ind}><Link className={`${colorsOmg[ind]} hover:text-purple-500`} to={item.path}><i className={`inline-block min-w-5 text-center ${item.fontAwsomeIconClass}`}></i> {item.label}</Link></li>)}

      <DropDownItem />
      <ModeToggle className="border" />
    </ul>
  </nav>
  )
}