import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { customAxios } from '../../api/customAxios.js';
import AdminSideBare from "../../components/AdminSideBar.jsx";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Profile from "../../components/Profile.jsx";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from 'react-redux';
import Alert from "../../components/Alert.jsx";
import { logout } from '../../redux/features/userSlice.js';
import { switchToUrlBaseOnUserRole } from '../../functions/switchToUrlBaseOnUserRole.js';
import Spinner from '../../components/Spinner.jsx';

const blogSchema = z.object({
  title: z.string().min(20, "Le titre doit contenir au moins 20 caractères").max(100, 'Le titre doit comporter au maximum 100 caractères'),
  content: z.string().min(100, 'Le contenu doit contenir au moins 100 caractères'),
  photo: z.any(),
});

export default function EditBlog() {
  const { token } = useSelector(slice => slice.user); 
  const [alertText, setAlertText] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [blogPic, setBlogPic] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, setValue } = useForm({
    resolver: zodResolver(blogSchema),
  });

  async function fetchData(){
    try{
      const response = await customAxios.get(`/blogs/${id}`);

      setValue('title', response.data.title);
      setValue('content', response.data.content);
      setBlogPic(response.data.photo_url);
    }catch(error){
      console.error(error)
    }
    
    setIsFetched(true);
  }

  useEffect(() => {
    setIsFetched(false);
    fetchData();
  }, [])

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('photo', data.photo[0]);
    formData.append('_method', 'put');

    try {
      const response = await customAxios.post(`/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      
      navigate('/adminstrateur/blogs');
    } catch(error) {
      console.error(error);

      if(error.response.status == 422){
        var error = error.response.data.errors;

        var key = Object.keys(error)[0];

        setError(key, {message: error[key]})
      }
      else{
        setAlertText("Quelque chose s'est mal passé");
      }
    }
  }

  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}

      <AdminSideBare activeItem={7} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Gestion de blogs</h4>
            </div>
            <Profile />
        </div>

        <div className='my-5'>
          <ul className="bg-secondary flex gap-1 py-2 px-4 font-mono">
            <li><Link className="hover:underline" to='../'>Blogs</Link></li>
            <li><Link to=''>{">"}</Link></li>
            <li>Modifier</li>
          </ul>
        </div>

        <div>
          {isFetched && 
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-5'>
                <label className="label-1">Titre</label>
                <Input className="input-1" type="text" {...register('title')} />
                {errors.title && <p className='text-xs text-red-500'>{errors.title.message}</p>}
              </div>
              
              <div className='mt-5'>
                <label className="label-1">Contenu</label>
                <Textarea className='input-1' {...register('content')} />
                {errors.content && <p className='text-xs text-red-500'>{errors.content.message}</p>}
              </div>
              
              <div className='mt-5'>
                <label className="label-1">Photo</label>
                <input type="file" name="photo" {...register('photo')} />
                {errors.photo && <p className='text-xs text-red-500'>{errors.photo.message}</p>}
                <img className="w-40 h-20 object-cover my-2" src={`${import.meta.env.VITE_BACKEND_URL}${blogPic}`} />
              </div>
              
              <button type="submit" disabled={isSubmitting} className="button-1 mt-5">
                {isSubmitting && <Spinner />} Ajouter Blog
              </button>
            </form>  
          }
        </div>

      </div>  
    </div>
  );
}
