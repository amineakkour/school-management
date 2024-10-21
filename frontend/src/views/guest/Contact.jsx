import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReCAPTCHA from "react-google-recaptcha";
import { customAxios  } from '../../api/customAxios';

const contactSchema = z.object({
  fullName: z.string().nonempty("Le nom complet est requis"),
  messageObject: z.string().nonempty("L'objet est requis"),
  phoneNumber: z.string().nonempty("Le numéro de téléphone est requis").min(10, "le numéro de téléphone doit être composé de 10 chiffres").max(10, "le numéro de téléphone doit être composé de 10 chiffres"),
  message: z.string().min(50, "Le message doit contenir 50 caractères au minimum").max(250, "Le message doit contenir 250 caractères au maximum").nonempty("Le message est requis"),
});

function Contact(props) {
  const [messageCounter, setMessageCounter] = useState(0);
  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => {
    if(!recaptchaValue) {
      setError("recaptcha", {message: "Veuillez vérifier que vous etes pas un robot!"})
      return ""
    }

    async function sendMessage() {
      var response = await customAxios.post('/messages', data);
    }

    try{
      sendMessage();
      setMessageSent(true);
    }catch(error) {
      console.log(error)
    }
    reset()
  };

  useEffect(() => {
    document.title = "Nous Contacter";
  },  [])

  return (
    <div className="bg-secondary rounded-sm p-4">
      <h1 className="text-2xl">Nous contacter</h1>
      <div className="text-gray-500 text-xs">Nous nous ferons un plaisir de répondre à vos questions le plus rapidement possible via votre numéro de téléphone.</div>
      <div className="text-gray-500 text-xs mb-8"><a href="/a-propos-de-nous#faq" className="underline">Visiter FAQ page.</a> Pour gagner du tmeps.</div>

      {!messageSent && 
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2">
        <label className="block mb-1 font-semibold">Nom complet</label>
        <input type="text" {...register('fullName')} className="input-1 max-w-96 text-xs" />
        {errors.fullName && <div className="text-red-500 text-xs">{errors.fullName.message}</div>}
      </div>

      <div className="my-2">
        <label className="block mb-1 font-semibold">Numéro de téléphone</label>
        <input type="text" {...register('phoneNumber')} className="input-1 max-w-96 text-xs" />
        {errors.phoneNumber && <div className="text-red-500 text-xs">{errors.phoneNumber.message}</div>}
      </div>
      
      <div className="my-2">
        <label className="block mb-1 font-semibold">L'objet de message</label>
        <input type="text" {...register('messageObject')} className="input-1 max-w-96 text-xs" />
        {errors.messageObject && <div className="text-red-500 text-xs">{errors.messageObject.message}</div>}
      </div>

      <div className="my-2 max-w-md">
        <label className="block mb-1 font-semibold">Message</label>
        <div className="relative">
          <textarea {...register('message')} className="input-1 text-xs" rows="5" onChange={(e) => setMessageCounter(e.target.value.length)} ></textarea>

          <span className={`absolute bottom-2 right-2 text-xs ${(messageCounter < 50 || messageCounter > 250) ? "text-red-500" : "text-gray-500"}`}>{messageCounter}/250</span>
        </div>
        {errors.message && <div className="text-red-500 text-xs">{errors.message.message}</div>}
      </div>

      <div className="my-2">
        <ReCAPTCHA sitekey="6LeSCOgpAAAAALHK-0oGYg2U1ggQXBtCIQQ5s3xc" onChange={v => setRecaptchaValue(v)} />
        {errors.recaptcha && <div className="text-red-500 text-xs">{errors?.recaptcha?.message}</div>}
      </div>
      
      <div className="my-5">
        <button type="submit" className="button-1">Enregistrer</button>
      </div>
    </form>
    }

    {messageSent && 
      <div>
        <h3 className='text-lg text-green-700'>Votre message a été envoyé avec succès.</h3>
        <button className='button-1' onClick={() => setMessageSent(false)}>Ajouter un message</button>
      
      </div>
    }
    </div>
  );
}

export default Contact;
