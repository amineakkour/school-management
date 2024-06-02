import styles from "../styles/login.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useTheme } from "../context/ThemeProvider";
import { customAxios } from "../api/customAxios";
import { useDispatch, useSelector } from 'react-redux';
import { switchToUrlBaseOnUserRole } from "../functions/switchToUrlBaseOnUserRole";


export const loginSchema = z.object({
  email: z.string().email("L'address email est invalide"),
  password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères."),
});

export default function LoginLayout({bgColor, userSpace, tmpImgURL, imgURL, formPath, redirectSpaces}) {
  const [isImgLoaded, setIsImageLoaded] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [alertText, setAlertText] = useState("")
  const { theme } = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginAttemps, setLoginAttemps] = useState(1)
  const user = useSelector(slice => slice.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if(user.token){
      navigate(switchToUrlBaseOnUserRole(user.role).dashboardPage, { replace: true });
    }

    setIsLoaded(true)
  }, [])

  
  const { register, handleSubmit, formState: { errors }, setError} = useForm({
    defaultValues: {
      email: "admin@admin.com",
      password: "admin@admin.com",
    },
    resolver: zodResolver(loginSchema),
  });

  async function submit(data) {
    setSubmitting(true)
    try {
      const response = await customAxios.post(formPath, data);
      
      const message = await response.data;

      dispatch({type: "user/login", payload: {token: message.token, userInfos: message.user, role: message.user.role}})
      
      navigate(switchToUrlBaseOnUserRole(message.user.role).dashboardPage, { replace: true });

    }catch(e) {
      if(e.response.status == 401){
        setError("email", {message: "Email ou Mot de passe incorrect"});

        if(loginAttemps % 3 == 0) setAlertText("Si vous pensez que vous avez rencontré un problème, veuillez contacter l'administration.")
      }else{
        setAlertText("Something Went wrong!")
      }
      console.error(e);
      // setError("")
    }

    setLoginAttemps(v => v +1);
    setSubmitting(false)
  } 

  if(!isLoaded) return ''
  
  return (
    <div className={`h-screen ${theme === "dark" ? "" : bgColor} flex justify-center items-center`}>
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}
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
              <input {...register("email")} type="email" id="email" name='email' className='input-2' placeholder="Entrez votre email" />
              {errors.email && <div className="text-red-500">{errors.email.message}</div>}
            </div>

            <div className="my-4">
              <label htmlFor="password" className='block mb-1'>Mot de passe</label>
              <div className="relative">
                <input {...register("password")} type={visiblePassword ? "text" : "password"} id="password" name='password' className="input-2 bg-white" placeholder='Entrez votre mot de passe' />
                <div className="absolute top-2 right-3 text-gray-600">
                  <button type="button" onClick={() => setVisiblePassword(v => !v)}><i className={`fa-solid ${visiblePassword ? "fa-eye-slash" : "fa-eye"}`}></i></button>
                </div>
              </div>
              {errors.password && <div className="text-red-500">{errors.password.message}</div>}
            </div>

            <div className="mt-3">
              <button disabled={submitting} className={`button-1 ${submitting ? "bg-blue-300" : ""}`}> {submitting && <Spinner />} Connexion</button>
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