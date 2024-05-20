import background_src from "../assets/background_1.jpg";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom"

export default function PageNotFound() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
  
      <main className="md:max-w-6xl mt-10 md:mt-20 md:p-5 mx-2 md:mx-auto">
      <section className="bg-white dark:bg-gray-900 bg-blend-multiply" style={{backgroundImage: `url(${background_src})`}}>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">404</h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Quelque chose manque :(</p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Nous ne trouvons pas cette page. Vous trouverez beaucoup de choses à explorer sur la page d'accueil. </p>
              <Link to="/" className="inline-flex bg-white hover:bg-stone-200 bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4 flex content-center items-center gap-2"><i className="fa-solid fa-house"></i> Page d'accueil</Link>
          </div>   
        </div>
      </section>
      </main>
    </div>
  );
}