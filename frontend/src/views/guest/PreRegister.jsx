import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReCAPTCHA from "react-google-recaptcha";

registerLocale('fr', fr);

const preRegisterSchema = z.object({
  studentName: z.string().nonempty("Le nom complet est requis").min(10, "le nom de l'Etudiant doit être composé au minimun de 10 lettres"),
  email: z.string().optional(),
  studentPhone: z.string().optional(),
  address: z.string().optional(),
  parentName: z.string().optional(),
  birthdate: z.date({ required_error: "La date de naissance est requise" }),
  parentPhone: z.string().nonempty("Le numéro de téléphone des parents est requis").min(10, "le numéro de téléphone doit être composé de 10 chiffres").max(10, "le numéro de téléphone doit être composé de 10 chiffres"),
  parentWork: z.string().optional(),
});

function PreRegister(props) {
  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const { register, handleSubmit, control, formState: { errors }, setError } = useForm({
    resolver: zodResolver(preRegisterSchema),
  });
  
  const onSubmit = (data) => {
    if(!recaptchaValue) {
      setError("recaptcha", {message: "Veuillez vérifier que vous etes pas un robot!"})
      return ""
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl">Fiche de Pre-Inscription pour annee scolaire 2025/2026:</h1>
      <div className="text-gray-500 text-xs mb-8">Les champs qui sont (<span className="text-red-500">*</span>) sont requis</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="my-2">
          <label className="block mb-1 font-semibold">Nom Complet de l'Etudiant<span className="text-red-500"> *</span></label>
          <input type="text" {...register('studentName')} className="input-1 text-xs max-w-96" />
          {errors.studentName && <div className="text-red-500 text-xs">{errors.studentName.message}</div>}
        </div>

        <div className="my-2">
          <label className="block mb-1 font-semibold">Email de l'Etudiant</label>
          <input type="text" {...register('email')} className="input-1 text-xs max-w-96" />
          {errors.email && <div className="text-red-500 text-xs">{errors.email.message}</div>}
        </div>

        <div className="my-2">
          <label className="block mb-1 font-semibold">Numéro de téléphone de l'Etudiant</label>
          <input type="text" {...register('studentPhone')} className="input-1 text-xs max-w-96" />
          {errors.studentPhone && <div className="text-red-500 text-xs">{errors.studentPhone.message}</div>}
        </div>

        <div className="my-2">
          <label className="block mb-1 font-semibold">Address</label>
          <textarea {...register('address')} className="input-1 text-xs max-w-96"></textarea>
          {errors.address && <div className="text-red-500 text-xs">{errors.address.message}</div>}
        </div>

        <div className="my-2">
          <label className="block mb-1 font-semibold">Nom complet Parent</label>
          <input type="text" {...register('parentName')} className="input-1 text-xs max-w-96" />
          {errors.parentName && <div className="text-red-500 text-xs">{errors.parentName.message}</div>}
        </div>

        <div className="my-2">
          <label className="block mb-1 font-semibold">Date de naissance de l'Etudiant<span className="text-red-500"> *</span></label>
          <Controller
            control={control}
            name="birthdate"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                locale="fr"
                dateFormat="dd/MM/yyyy"
                className="input-1 text-xs max-w-96"
              />
            )}
          />
          {errors.birthdate && <div className="text-red-500 text-xs">{errors.birthdate.message}</div>}
        </div>

        <div className="my-2">
          <label className="block mb-1 font-semibold">Numéro de téléphone des parents<span className="text-red-500"> *</span></label>
          <input type="text" {...register('parentPhone')} className="input-1 text-xs max-w-96" />
          {errors.parentPhone && <div className="text-red-500 text-xs">{errors.parentPhone.message}</div>}
        </div>

        <div className="my-2">
          <label className="block mb-1 font-semibold">Travail des parents</label>
          <input type="text" {...register('parentWork')} className="input-1 text-xs max-w-96" />
          {errors.parentWork && <div className="text-red-500 text-xs">{errors.parentWork.message}</div>}
        </div>
      </div>

      <div className="my-2">
        <ReCAPTCHA sitekey="6LeSCOgpAAAAALHK-0oGYg2U1ggQXBtCIQQ5s3xc" onChange={v => setRecaptchaValue(v)} />
        {errors.recaptcha && <div className="text-red-500 text-xs">{errors?.recaptcha?.message}</div>}
      </div>
      
      <div className="my-5">
        <button type="submit" className="button-1">Enregistrer</button>
        <div className="text-xs mt-2 text-gray-500">Si vous avez rencontré un problème. Veuillez nous contacter sur <a href="mailto:amineakour6@mail.com" className="underline hover:text-gray-600">amineakour6@mail.com</a></div> 
      </div>
    </form>
  );
}

export default PreRegister;
