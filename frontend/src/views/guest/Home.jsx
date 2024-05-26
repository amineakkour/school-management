import * as React from "react";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom"
import preschoolPicture from "../../assets/preschool.jpg";
import primaryPicture from "../../assets/primary.jpg";
import juniorHightSchoolPicture from "../../assets/junior_high_school.jpg";
import hightSchoolPicture from "../../assets/high_school.jpg";
import ElMoudaPhoto from "../../assets/el_mouda_amine.jpg";
import doubleQuotesPicture from "../../assets/double-quotes-.png";


import bg_1 from "../../assets/home_bg_1.jpg";
import bg_2 from "../../assets/home_bg_2.jpg";
import bg_3 from "../../assets/home_bg_3.jpg";
import bg_4 from "../../assets/home_bg_4.jpg";
import bg_5 from "../../assets/home_bg_5.jpg";
import bg_6 from "../../assets/home_bg_6.jpg";


function Carousel() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={window.innerWidth > 600 ? 50 : 10}
        slidesPerView={1.5}
        className="cursor-pointer"
      >
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_3} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_5} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_6} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_2} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_1} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_4} alt="" /></SwiperSlide>
      </Swiper>

      <div className="swiper-button-next absolute right-0 top-1/2 z-20 h-8 w-8 rounded-full cursor-pointer text-lg text-center bg-blue-400 right-to-left"><i className="fa-solid fa-angle-right"></i></div>
      <div className="swiper-button-prev absolute left-0 top-1/2 z-20 h-8 w-8 rounded-full cursor-pointer text-lg text-center bg-blue-400 left-to-right"><i className="fa-solid fa-angle-left"></i></div>
    </div>
  );
}

export default function GuestHome() {
  return (
    <div className="">
      <div id="rain-bow"></div>
      
      <div className="mb-10 p-5 bg-blue-700">
        <h3 className="text-xl md:text-4xl text-center flash">
          <Link to="/pre-inscription" className="hover:underline font-1 text-pink-100">Inscriptions Ouvertes Pour 2024-2025</Link>
        </h3>
      </div>
      
      <div className="my-8">
        <Carousel />
      </div>

      <div className="my-8 text-black">
        <h3 className="text-4xl mb-4 text-primary">Nos Formations</h3>
        
        <div>

          <div className="flex gap-5 items-center my-2 bg-yellow-100 p-2">
            <div className="shrink-0">
              <img src={preschoolPicture} alt="image Maternelle" className="w-24 h-24 object-cover" />
            </div>

            <div className="">
              <h3 className="text-2xl">Maternelle</h3>
              <p>La maternelle est la première étape de l'éducation scolaire, destinée aux enfants âgés de 3 à 5 ans. Elle vise à développer les compétences sociales, émotionnelles, et motrices des enfants tout en introduisant les bases de l'apprentissage.</p>
            </div>
          </div>

        <div className="flex gap-5 items-center my-2 bg-yellow-50 p-2">
            <div className="shrink-0">
              <img src={primaryPicture} alt="image Primaire" className="w-24 h-24 object-cover" />
            </div>

            <div>
              <h3 className="text-2xl">Primaire</h3>
              <p>Primaire  a pour mission de donner aux élèves les fondamentaux en lecture, écriture, mathématiques, sciences, histoire, et géographie, tout en favorisant leur développement personnel et leur ouverture au monde.</p>
            </div>
          </div>

          <div className="flex gap-5 items-center my-2 bg-yellow-100 p-2">
            <div className="shrink-0">
              <img src={juniorHightSchoolPicture} alt="image Collège" className="w-24 h-24 object-cover" />
            </div>
            <div className="">
              <h3 className="text-2xl">Collège</h3>
              <p>Le collège vise à consolider les acquis de l'école primaire, à élargir les connaissances dans de nouvelles disciplines comme les langues étrangères et la technologie, et à préparer les élèves au lycée.</p>
            </div>
          </div>

          <div className="flex gap-5 items-center my-2 bg-yellow-50 p-2">
            <div className="shrink-0">
              <img src={hightSchoolPicture} alt="image Lycée" className="w-24 h-24 object-cover" />
            </div>

            <div>
              <h3 className="text-2xl">Lycée</h3>
              <p>Le lycée est l'étape finale de l'enseignement secondaire. Il prépare les élèves soit aux études supérieures soit à l'entrée dans la vie active, avec comme objectif l'obtention du baccalauréat.</p>
            </div>
          </div>

          
        </div>
        
      </div>

      <div className="my-8 bg-stone-900 text-white p-5">
      <h3 className="text-4xl">Histoire de Réussite</h3>
      <h5 className="text-xl mb-4">d'un Ancien Élève : Diplômé de l'École Amine</h5>
      <p>Nous sommes fiers de mettre en avant le succès de l'un de nos anciens élèves distingués, qui a réalisé des progrès remarquables dans le domaine de la technologie après avoir obtenu baccalauréat chez <span className="font-semibold">Groupe Scolaire Amine</span>.</p>
      <p className="mb-4">El Mouda Amine a obtenu son diplôme avec une mention très bien. Réfléchissant à son parcours, il a partagé avec nous:</p>

      
      <div className="flex items-center flex-col md:flex-row md:gap-10">
        <div className="shrink-0 w-full md:w-max"><img className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full" src={ElMoudaPhoto} alt="Image de nous ancien élève El Mouda Amine" /></div>

        <div className="my-4 font-1 font-semibold text-lg">
          
          <div className="mb-4">
            <img src={doubleQuotesPicture} className="bg-blend-darken w-4 h-4 object-contain" alt="double quotes" style={{filter: 'invert(100%)'}} />
            <p>
              Grâce à l'École Amine, j'ai acquis les bases en mathématiques nécessaires pour étudier l'ingénierie   informatique après le bac. Le programme rigoureux et complet m'a fourni les compétences essentielles pour poursuivre ma passion
            </p>
          </div>

          
          <div className="my-4">
            <img src={doubleQuotesPicture} className="bg-blend-darken w-4 h-4 object-contain" alt="double quotes" style={{filter: 'invert(100%)'}} />
            <p>
              Je travaille maintenant chez Google, où j'applique chaque jour les connaissances et compétences acquises à l'École Amine. Les techniques analytiques et de résolution de problèmes que j'ai apprises ont été inestimables dans mon rôle.
            </p>
          </div>

          <div className="my-4">
            <img src={doubleQuotesPicture} className="bg-blend-darken w-4 h-4 object-contain" alt="double quotes" style={{filter: 'invert(100%)'}} />
            <p>L'École Amine a une communauté incroyable. Le soutien des pairs et l'esprit de collaboration ont été déterminants dans ma croissance personnelle et professionnelle.</p>
          </div>

          <div className="my-4">
            <img src={doubleQuotesPicture} className="bg-blend-darken w-4 h-4 object-contain" alt="double quotes" style={{filter: 'invert(100%)'}} />
            <p>Les enseignants sont formidables. Leur engagement envers la réussite des élèves et leur passion pour l'enseignement ont eu un impact significatif sur mon parcours éducatif.</p>
          </div>
        </div>

        </div>
        <p>
          Les réalisations de El Mouda Amine sont un témoignage de la qualité de l'éducation et de l'environnement favorable que l'École Amine offre. Nous célébrons ses accomplissements et attendons avec impatience d'inspirer plus d'élèves à viser les étoiles.
        </p>
      </div>


    </div>
  );
}

