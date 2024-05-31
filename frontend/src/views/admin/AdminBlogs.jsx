import React, { useState, useEffect } from 'react';
import { customAxios } from '../../api/customAxios.js';
import AdminSideBare from "../../components/AdminSideBar";
import { Link, useSearchParams} from 'react-router-dom';
import Profile from "../../components/Profile";
import { Checkbox } from "@/components/ui/checkbox"

function Blog({ imgUrl, title, id}) {
  return <div className='bg-secondary p-3 rounded-md mb-3  shadow-sm border'>
    <div className="flex gap-5">
      <div className="w-32 h-20 border shrink-0"><img className="w-full h-full object-cover rounded-md" src={imgUrl} alt={title} /></div>

      <div className="">
        <h3 className="md:text-xl font-semibold">{title}</h3>
        <div className="flex gap-2 mt-2">
          <button className="button-1 ">Modifier</button>
          <button className="button-3">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
}


function AdminBlogs(props) {
  const [blogs, setBlogs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keywords, setKeywords] = useState(searchParams.get('keywords') || '');
  const [showDeleted, setShowDeleted] = useState(false);

  async function fetchData(){
    const reponse = await customAxios.get(`blogs?keywords=${keywords}`);

    setBlogs(reponse.data);

    console.log(reponse.data);
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    setSearchParams({ keywords, "show-deleted": showDeleted });
  }, [keywords, showDeleted])

  function submit(event) {
    event.preventDefault();
    setBlogs([]);
    fetchData();
  }
  
  return (
    <div className="flex">
      <AdminSideBare activeItem={7} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Gestion de blogs</h4>
            </div>

            <Profile />
        </div>

        <div className='my-5'>
          <nav>
              <ul className="flex gap-3 bg-secondary items-center py-2 px-4 font-mono">
                <li><Link className="hover:underline text-xs" to="ajouter">Ajouter blog</Link></li>
              </ul>
            </nav>

          <form onSubmit={submit} className="my-10">
            <div className='flex gap-2'>
              <input type="text" className="input-1 max-w-96" placeholder="Recherche par mots clés" value={keywords} onChange={e => setKeywords(e.target.value)} />
              <button className="button-1"><i className="fa-solid fa-magnifying-glass"></i> Recherche</button>
            </div>

            <li className="flex items-center gap-1 mt-2"><Checkbox value={showDeleted} onClick={e => setShowDeleted(v => !v)} /> Afficher les blogs supprimés</li>
          </form>

          <div>
            <div className="font-semibold mb-1">Resultat: {blogs.length}</div>
            {blogs.map(blog => <Blog key={blog.id} title={blog.title} imgUrl={blog.photo_url} id={blog.id} />)}
          </div>
        </div>

        </div>  
      </div>
  );
}

export default AdminBlogs;