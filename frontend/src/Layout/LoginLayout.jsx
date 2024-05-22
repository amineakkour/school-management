import styles from "../styles/login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useTheme } from "../context/ThemeProvider";


export const loginSchema = z.object({
  email: z.string().email("L'address email est invalide"),
  password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères."),
});

export default function LoginLayout({bgColor, userSpace, tmpImgURL, imgURL, formPath, redirectSpaces}) {
  const [isImgLoaded, setIsImageLoaded] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [alertText, setAlertText] = useState("")
  const { theme } = useTheme();

  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      email: "amineakour6@gmail.com",
      password: "amineakour6@gmail.com",
    },
    resolver: zodResolver(loginSchema),
  });
  const [submitting, setSubmitting] = useState(false);
  
  function submit() {
    setSubmitting(true)
    setAlertText("Quelque chose ne va pas, veuillez réessayer plus tard")
    console.log("submit to " + formPath);
  } 

  return (
    <div className={`h-screen ${theme === "dark" ? "" : bgColor} flex justify-center items-center`}>
      {alertText && <Alert text={alertText} />}
      <div className={`${theme === "dark" ? "bg-secondary" : "bg-white"} w-full mx-4 max-w-lg md:max-w-screen-md p-5 flex rounded-md gap-5 transition-all shadow-md hover:shadow-2xl`}>
        
        <div className='hidden md:block'>
            <img src={tmpImgURL} alt="Login Picture" className={`w-80 h-80 object-cover rounded-md object-right-top ${!isImgLoaded ? "block": "hidden"}`} />
            <img src={imgURL} alt="" onLoad={() => setIsImageLoaded(true)} className={`w-80 h-80 object-cover rounded-md object-right-top ${isImgLoaded ? "block": "hidden"}`} />
        </div>

        <div className={`${styles.formContainer} w-full md:max-w-96`}>
          {/* ////// FORM_START ////// */}
          <form className="md:min-w-96" onSubmit={handleSubmit(submit)}>
            
            <h1 className='text-2xl mt-4'>Espace {userSpace}</h1>
            <button type="button" className="text-gray-400 text-xs hover:text-gray-600"><Link to="/"><i className="fa-solid fa-arrow-left"></i> Acceuil</Link></button>
            <div className="my-4">
              <label htmlFor="email" className='block mb-1'>Email</label>
              <input {...register("email")} type="email" id="email" name='email' className='border text-stone-600 focus:text-stone-900 border-stone-400 focus:border-stone-800 outline-0 rounded-sm p-2 w-full' placeholder="Entrez votre email" />
              {errors.email && <div className="text-red-500">{errors.email.message}</div>}
            </div>

            <div className="my-4">
              <label htmlFor="password" className='block mb-1'>Mot de passe</label>
              <div className="relative">
                <input {...register("password")} type={visiblePassword ? "text" : "password"} id="password" name='password' className="border text-stone-600 focus:text-stone-900 border-stone-400 focus:border-stone-800 outline-0 rounded-sm p-2 w-full" placeholder='Entrez votre mot de passe' />
                <div className="absolute top-2 right-3 text-gray-600">
                  <button type="button" onClick={() => setVisiblePassword(v => !v)}><i className={`fa-solid ${visiblePassword ? "fa-eye-slash" : "fa-eye"}`}></i></button>
                </div>
              </div>
              {errors.password && <div className="text-red-500">{errors.password.message}</div>}
            </div>

            <div className="mt-3">
              <button disabled={submitting} className={`bg-blue-500 px-1 py-2 rounded-sm text-white flex items-center gap-1 text-xs ${submitting ? "bg-blue-300" : ""}`}> {submitting && <Spinner />} Connexion</button>
              <div className="mt-1 text-gray-400 flex gap-2 text-xs">
                <div>{"Rediriger vers l'éspace:"}</div>
                <ul className="flex gap-1">
                  {redirectSpaces.map((space, ind) => <li key={ind}><Link to={space.path} className="hover:text-gray-600">{space.label}</Link></li>)}
                </ul>
              </div>
            </div>

          </form>
          {/* ////// FORM_END ////// */}
        </div>
      </div>
    </div>
  )
}