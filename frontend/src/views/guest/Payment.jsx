import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { fr } from 'date-fns/locale';
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form"
import { format } from 'date-fns';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

registerLocale('fr', fr);


const schema = z.object({
    fullname: z.string().min(6, { message: "Le nom doit contenir au moins 6 caractères" }),
    date: z.date().refine((date) => date !== null, {
      message: 'La date de naissence est requis',
    }),
});

function Payment(props) {
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const { handleSubmit, control, register, formState: {errors} } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      birthday: new Date(),
    }
  });;

  function submit(data) {
    setStep(2)
  }

  useEffect(() => {
    document.title = "Paiement des frais";
  }, [])
  

  return (
    <div className="max-w-screen-2xl mx-auto">
      <form className="max-w-6xl mt-10 md:mt-20 md:p-5 mx-2 md:mx-auto" onSubmit={handleSubmit(submit)}>
        <h1 className="text-2xl">Paiement des frais de scolarité</h1>

        <div className="text-xs text-gray-400">Etapes: {step}/3</div>
        
        {step == 1 ? 
        <>
          <div className="my-4">
            <label htmlFor="" className="block text-gray-800 mb-1">Le nom complet de l'étudiant</label>
            <input type="text" className="input-1 max-w-80 text-xs font-semibold" {...register('fullname')} value={name} onChange={e => setName(e.target.value.toUpperCase())} />
            
            {errors.fullname ? 
              <div className="text-xs text-red-500">{errors.fullname.message}</div> 
              :
              <div className="text-xs text-gray-400">Nom complet = Nom + Prenom.</div>
            }
          </div>

          <div className="my-4">
            <label htmlFor="" className="block text-gray-800 mb-1">Date de naissance</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => ( <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} dateFormat="yyyy/MM/dd" locale="fr" dateFormat="dd/MM/yyyy" className="input-1 text-xs font-semibold" /> )}
            />
            {errors.date && <div className="text-xs text-red-500">{errors.date.message}</div>}
          </div>
        </>
        : "Hello"
        }
        


        <div className="flex gap-1">
          <button type="button" className="button-2"><Link to="/">Annuler</Link></button>
          <button className="button-1">Suivant <i className="fa-solid fa-arrow-right"></i></button>
        </div>

      </form>

    </div>
  );
}

export default Payment;