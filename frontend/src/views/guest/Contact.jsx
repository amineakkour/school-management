import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  fullName: z.string().nonempty("Le nom complet est requis"),
  messageObject: z.string().nonempty("L'objet est requis"),
  email: z.string().email("Email invalide").nonempty("L'email est requis"),
  message: z.string().min(50, "Le message doit contenir 50 caractères au minimum").max(250, "Le message doit contenir 250 caractères au maximum").nonempty("Le message est requis"),
});

function Contact(props) {
  const [messageCounter, setMessageCounter] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-50 p-4">
      <h1 className="text-2xl">Nous contacter</h1>
      <div className="text-gray-500 text-xs mb-8">Nous nous ferons un plaisir de répondre à vos questions le plus rapidement possible via votre numéro de téléphone.</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <label className="block mb-1 font-semibold">Nom complet</label>
          <input type="text" {...register('fullName')} className="input-1 max-w-96 text-xs" />
          {errors.fullName && <div className="text-red-500 text-xs">{errors.fullName.message}</div>}
        </div>

        <div className="my-2">
          <label className="block mb-1 font-semibold">Email</label>
          <input type="text" {...register('email')} className="input-1 max-w-96 text-xs" />
          {errors.email && <div className="text-red-500 text-xs">{errors.email.message}</div>}
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

        <div className="my-5">
          <button type="submit" className="button-1">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
