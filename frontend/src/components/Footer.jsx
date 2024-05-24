import React from 'react';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useTheme } from '../context/ThemeProvider';

function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`border-t ${theme == "dark" ? "text-whithe" : "text-stone-900"}`}>
      <div className="p-4 flex flex-col md:flex-row items-center md:gap-20">
        <div>
          <img src={logo} alt="" className="w-44" />
        </div>

        <div className='flex gap-8 flex-wrap'>
          <div>
            <h3 className="text-2xl mb-3">Informations</h3>
            <ul>
              <li><i className="fa-solid fa-phone"></i>+212 (0) 5 00 00 00 01</li>
              <li><i className="fa-solid fa-phone"></i>+212 (0) 5 00 00 00 00</li>
              <li><i className="fa-solid fa-envelope"></i> support@amine.com</li>
              <li><i className="fa-solid fa-envelope"></i> contact@amine.com</li>
              <li><i className="fa-solid fa-location-pin"></i> Rue 81 NR 61 dar bouazza, Casablanca</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl mb-3">Liens utiles</h3>
            <ul className='underline'>
              <li><Link to="">Pre-inscription</Link></li>
              <li><Link to="">Nous contacter</Link></li>
              <li><Link to="">Payer les frais de scolarité</Link></li>
              <li><Link to="">Connexion</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl mb-3">Derniers blogs</h3>
            <ul className='underline'>
              <li><Link to="">Ipsum. ipsum dolor sit, amet consectetur...</Link></li>
              <li><Link to="">Lorem ipsum dolor sit.</Link></li>
              <li><Link to="">Dolor sit amet ipsum consectetur.</Link></li>
            </ul>
          </div>

        </div>

        
      </div>


      <div className="bg-stone-900 text-white p-2 text-center text  -xs">&copy; 2024 GROUPE SCOLAIRE AMINE, Tous les droits sont réservés.</div>
    </footer>
  );
}

export default Footer;