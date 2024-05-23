import { Link } from "react-router-dom";
import directorPic from "../../assets/director.jpg";
import background_src from "../../assets/background_2.jpg";
import { useEffect, useRef, useState } from "react";
import { flashElementsWhileScrolling } from "../../functions/flashElementsWhileScrolling";
import { useTheme } from "../../context/ThemeProvider";

var FAQ_data = [
  {question: "Quels sont les horaires de l'école?", answer: "Nos horaires varient en fonction des niveaux scolaires. Pour obtenir des informations spécifiques sur les horaires de chaque niveau, veuillez consulter la section 'Horaire' de notre site web ou contacter le bureau de l'école."},
  {question: "Quels programmes d'études offrez-vous?", answer: "Nous proposons un large éventail de programmes d'études, adaptés à chaque niveau scolaire. Pour plus de détails sur nos programmes spécifiques, veuillez consulter la section 'Programmes' de notre site web."},
  {question: "Quelles sont les activités parascolaires disponibles?", answer: "Nous offrons une variété d'activités parascolaires, allant des clubs académiques aux sports en passant par les activités artistiques et culturelles. Pour découvrir toutes nos activités, veuillez consulter la section 'Activités Parascolaires' de notre site web."},
  {question: "Comment puis-je m'inscrire à l'école?", answer: "Pour vous inscrire à notre école, veuillez remplir le formulaire de demande d'inscription disponible sur notre site web. Une fois que nous avons reçu votre demande, notre équipe administrative vous contactera pour vous guider à travers le processus d'inscription."},
  {question: "Quels sont les services de soutien disponibles pour les élèves?", answer: "Nous offrons une gamme complète de services de soutien aux élèves, y compris le conseil scolaire, le soutien académique, et le soutien socio-émotionnel. Notre équipe est dédiée à aider chaque élève à réussir et à s'épanouir."},
  {question: "Comment puis-je contacter l'école en cas d'urgence?", answer: "En cas d'urgence, vous pouvez contacter le bureau de l'école au +212 674997400 ou envoyer un e-mail à amineakour6@gmail.com. Nous sommes disponibles pour répondre à vos questions et vous aider en cas de besoin."},
  {question: "Quelles sont les politiques de l'école en matière de sécurité et de santé?", answer: "La sécurité et la santé de nos élèves sont notre priorité absolue. Pour en savoir plus sur nos politiques en matière de sécurité et de santé, veuillez consulter la section 'Politiques' de notre site web ou contacter le bureau de l'école pour obtenir des informations spécifiques."},
  {question: "Comment puis-je obtenir des mises à jour et des annonces importantes de l'école?", answer: "Pour rester informé des dernières nouvelles et annonces de l'école, veuillez vous abonner à notre bulletin d'information ou suivre nos réseaux sociaux officiels. Vous pouvez également consulter régulièrement la section 'Actualités' de notre site web pour les mises à jour importantes."},
]


function Division({title, text}) {
  return (
    <div className="my-5 md:my-8">
      <h2 className="text-3xl mb-2 md:mb-4">{title}</h2>
      <div>{text}</div>
    </div>
  )
}

function DirectorWord() {
  return (

    <div className="flex flex-col md:flex-row gap-5">
      <div className="max-w-96">
        <img src={directorPic} alt="L'image de directeur de l'établissement" />
      </div>
      
      <div className="w-full">
        <div className="text-lg font-semibold mb-2">Chers élèves, parents et membres de la communauté</div>

        <p>C'est avec un immense plaisir que je vous souhaite la bienvenue sur le site de notre école. En tant que directeur, je suis honoré de diriger une institution dédiée à l'excellence académique et au développement holistique de chaque élève.</p>
        

        <p>Notre école est bien plus qu'un simple lieu d'apprentissage; c'est un foyer de connaissances, de valeurs et de possibilités infinies. En travaillant en collaboration avec notre équipe enseignante exceptionnelle et notre personnel dévoué, nous nous efforçons de créer un environnement d'apprentissage dynamique et inclusif où chaque élève peut s'épanouir et réaliser son plein potentiel.</p>

        <p>Je suis profondément convaincu que l'éducation est la clé de l'avenir, et c'est pourquoi nous nous engageons à offrir à nos élèves les meilleures opportunités éducatives possibles. Ensemble, nous construisons des fondations solides pour un avenir brillant.</p>

        <p>Je vous encourage tous à explorer notre site et à découvrir tout ce que notre école a à offrir. N'hésitez pas à nous contacter si vous avez des questions ou si vous souhaitez en savoir plus sur notre programme éducatif.</p>

        <p>Au plaisir de vous accueillir au sein de notre communauté éducative.</p>

        <p>Bien cordialement,</p>

        <p className="font-semibold">
          L'Hej Bennani, Directeur de l'école
        </p>
      
      </div>
    </div>
  )
}

function Map() {
  return (
    <div>
      <p className="mb-2">Notre école est idéalement située au cœur de Casablanca, offrant un accès facile aux élèves de toute la région. Nichée dans un environnement paisible et propice à l'apprentissage, notre campus est un lieu dynamique où les élèves peuvent s'épanouir tant sur le plan académique que personnel. Avec des installations modernes et des espaces verts inspirants, notre emplacement offre le cadre parfait pour une éducation de qualité.</p>

      <iframe className="w-full h-96 md:h-[500px]" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11857.923534796317!2d-7.682808602630834!3d33.58039168238759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sma!4v1716222231200!5m2!1sfr!2sma" styles={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

function FAQ() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState(FAQ_data)

  function updateData(new_value) {
    const inputValue = new_value.toLowerCase();
    setSearch(inputValue)

    if(inputValue) {
      setData(FAQ_data.filter(q => q.question.toLowerCase().includes(inputValue) || q.answer.toLowerCase().includes(inputValue)))
    }else{
      setData(FAQ_data);
    }
  }

  return (
    <div>
      <h3 className="text-xl">Avez-vous des questions? Nous avons des rèponses!</h3>
      <div className="text-gray-500">
        Envoyez vos questions vers cet email <a className="underline hover:text-gray-800" href="mailto:amineakour6@gmail.com">amineakour6@gmail.com</a>. Nous serons heureux de répondre à toutes vos questions
      </div>

      <div className="mt-4">
        <div className="relative max-w-3xl">
          <input type="text" placeholder="Recherche Par mots-clés" className="placeholder:text-gray-400 border p-2 w-full outline-0 focus:border-green-700 shadow-sm focus:shadow-md text-green-700 font-semibold" value={search} onChange={e => updateData(e.target.value)} />

          <div className="absolute top-1 right-3 text-lg w-8 text-center">
            {search ? 
            <button className="w-full text-green-700" onClick={() => updateData("")}><i className="fa-solid fa-x"></i></button>
            :
              <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            }
          </div>
        </div>
        {data.length ? data.map((q, ind) => <Question key={ind} question={q.question} answer={q.answer} /> ) : <p className="mt-3 text-stone-500">Si vous ne trouvez pas la question que vous recherchez, vous pouvez nous <Link to="/message" className="underline hover:text-stone-900">Envoyer un Message.</Link></p>}
      </div>
    </div>
  )
}

function Question({question, answer}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === "dark" ? "bg-secondary" : "bg-green-700"} transition-all ${isOpen ? `my-5 scale-105 ${theme === "dark" ? "bg-secondary" : "bg-green-800 hover:bg-green-800"} shadow-lg` : ""}  max-w-3xl p-2 bg-contain text-white bg-blend-multiply rounded-md my-2`} id={{backgroundImage: `url(${background_src})`}} style={{backgroundImage: `url(${isOpen ? background_src : ''}), linear-gradient(#fff, #fff)`}}>
      <div onClick={() => setIsOpen(v => !v)} className="flex justify-between items-center md:text-lg font-semibold cursor-pointer">
        <div>{question}</div>
        <div className={`${isOpen ? "rotate-180" : ""}`}><i className="fa-solid fa-chevron-down"></i></div>
      </div>

      {isOpen && <div className="pt-1 text-xs md:text-sm">{answer}</div> }
    </div>
  )
}

export default function AboutUs() {
  const div1 = useRef(null);
  const div2 = useRef(null);
  const div3 = useRef(null);
  const div4 = useRef(null);
  const div5 = useRef(null);
  const [isUpArrowVisible, setIsUppArrowVisible] = useState(window.scrollY > 300);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setIsUppArrowVisible(window.scrollY > 300)
    })
  })
  
  useEffect(() => {
    const elements = [div1?.current, div2?.current, div3?.current, div4?.current, div5?.current];

    flashElementsWhileScrolling(elements)
    
    window.addEventListener("scroll", () => flashElementsWhileScrolling(elements))
  }, [])

  function scrollToElement(element) {
    const scrollToY = element.getBoundingClientRect().top - 100;
    const delay = scrollToY * 100 / 450;

    window.scroll({top: scrollToY, behavior: "smooth"})
    element.classList.remove("pop-up");
    
    setTimeout(() => {
      element.classList.add("pop-up");
    }, delay);
  }

  return (
    <div className="m-2 md:mx-auto p-4">
      <div id="rain-bow"></div>
      {isUpArrowVisible && <button style={{background:"linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"}} id="up-arrow" className="pop-up fixed bottom-5 right-8 bg-cyan-500 w-12 h-12 hover:scale-125 transition-all rounded-full text-xl" onClick={() => window.scroll({top: 0, behavior: "smooth"})}><i className="fa-solid fa-up-long"></i></button>}

      <nav className={`pop-up bg-green-700 max-w-3xl p-2 bg-contain text-white bg-blend-multiply`} style={{backgroundImage: `url(${background_src})`}}>
        <h5 className="text-lg">Index: </h5>
        <ul>
          <li className="list-disc ml-6"><Link className="hover:underline" to="" onClick={() => scrollToElement(div1.current)}>Qui somme-nous?</Link></li>
          <li className="list-disc ml-6"><Link className="hover:underline" to="" onClick={() => scrollToElement(div2.current)}>Pourquoi Nous?</Link></li>
          <li className="list-disc ml-6"><Link className="hover:underline" to="" onClick={() => scrollToElement(div3.current)}>Mot de directeur</Link></li>
          <li className="list-disc ml-6"><Link className="hover:underline" to="" onClick={() => scrollToElement(div4.current)}>Où sommes-nous situés ?</Link></li>
          <li className="list-disc ml-6"><Link className="hover:underline" to="" onClick={() => scrollToElement(div5.current)}>FAQ </Link></li>
        </ul>
      </nav>

      <div className="mt-20">
        <div ref={div1} className="opacity-0">
          <Division title={"Qui somme-nous?"} text="Nous sommes une équipe passionnée et dévouée qui s'engage à fournir une éducation de qualité et à soutenir le développement de chaque élève. Notre école est bien plus qu'un simple établissement d'enseignement; nous sommes une communauté dynamique où les élèves, les enseignants, le personnel et les parents travaillent ensemble pour créer un environnement d'apprentissage enrichissant. Avec une équipe d'enseignants hautement qualifiés et des installations modernes, nous nous efforçons de fournir à nos élèves les outils nécessaires pour réussir dans un monde en constante évolution." />
        </div>

        <div ref={div2} className="opacity-0">
          <Division title={"Pour quoi Nous?"} text="Nous sommes convaincus que notre approche pédagogique unique et notre engagement envers l'excellence font de nous le choix idéal pour votre parcours éducatif. En tant qu'équipe, nous mettons l'accent sur l'individualisation de l'enseignement, en reconnaissant et en répondant aux besoins uniques de chaque élève. Nous offrons un environnement inclusif où la diversité est célébrée et où chaque voix est valorisée. De plus, notre équipe dévouée d'enseignants et de membrescv du personnel est résolue à fournir un soutien complet, tant sur le plan académique que social, pour garantir la réussite de chaque élève. Rejoignez-nous dans notre voyage vers l'excellence éducative !" />
        </div>

        <div ref={div3} className="opacity-0">
          <Division title={"Mot de directeur"} text={<DirectorWord />} />
        </div>


        <div ref={div4} className="opacity-0">
          <Division title={"Où sommes-nous situés?"} text={<Map />} />
        </div>
        
        <div  className="opacity-0" ref={div5}>
          <Division title={"FAQ"} text={<FAQ />} />
        </div>

      </div>
    </div>
  )
}