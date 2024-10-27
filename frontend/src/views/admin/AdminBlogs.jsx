import React, { useState, useEffect } from 'react';
import { customAxios } from '../../api/customAxios.js';
import AdminSideBare from "../../components/AdminSideBar";
import { Link, useNavigate, useSearchParams} from 'react-router-dom';
import Profile from "../../components/Profile";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/features/userSlice.js";
import { switchToUrlBaseOnUserRole } from '../../functions/switchToUrlBaseOnUserRole.js';
import Alert from '../../components/Alert.jsx';
import { formatDate } from "../../functions/formatDate.js";

function Blog({fetchData, setFetched, setAlertText, blogData}) {
  const [more, setMore] = useState(false);
  const { token } = useSelector(slice => slice.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function deleteBlog() {
    setIsDeleting(true);
    
    try{
      const response = await customAxios.delete(`/blogs/${blogData.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    fetchData();
  }
  catch(error) {
    console.error(error)
    setAlertText("Quelque chose s'est mal passé");
    if(error.response?.status === 401) {
      dispatch(logout())
      navigate(switchToUrlBaseOnUserRole('admin').loginPage)
  }
  }
  
  setIsDeleting(false);
  }

  return <div className='bg-secondary p-3 rounded-md mb-3  shadow-sm border'>
    <div className="flex gap-5">
      <div className="w-32 h-20 border shrink-0"><img className="w-full h-full object-cover rounded-md" src={`${import.meta.env.VITE_BACKEND_URL}${blogData.photo_url}`} alt={blogData.title} /></div>

      <div className="">
        <h3 className="md:text-xl font-semibold break-all	">#{blogData.id}: {blogData.title}</h3>
        <div className='flex gap-3 text-gray-500/75 mb-2 text-[10px]'>
          <div>Créer le {formatDate(blogData.created_at)} </div>
          <div>Modifier le {formatDate(blogData.updated_at)}</div>
        </div>
        <button className='link-1 flex border-b items-center border-gray-400' onClick={() => setMore(v => !v)}>
          {more ? 
          <><span className='block w-28 text-start'>Réduire</span> <i className="fa-solid fa-caret-up"></i></> : 
          <><span className='block w-28 text-start'>Afficher le contenu</span> <i className="fa-solid fa-caret-down"></i></>}
        </button>
        <div className='mt-1 border-gray-400'>{more && blogData.content}</div>
        <div className="flex gap-2 mt-2">
          <Link to={`modifier/${blogData.id}`} className='button-1'>Modifier</Link>
          <button className={`${isDeleting ? 'button-4' : 'button-3'}`} disabled={isDeleting} onClick={deleteBlog}>{isDeleting ? 'Suppression...' : 'Supprimer'}</button>
        </div>
      </div>
    </div>
  </div>
}

function BlogSkeleton() {
  return <div className='my-5'>
    <div>
      <Skeleton className="w-full p-5 flex gap-5">
        <Skeleton className="w-32 h-20 bg-black/15 shrink-0" />
        <div className='w-full'>
          <Skeleton className="w-full md:w-96 h-[20px] bg-black/15" />
          <div className='flex gap-5 mt-5'>
          <Skeleton className="w-16 h-[30px] bg-black/15" />
          <Skeleton className="w-16 h-[30px] bg-black/15" />
          </div>
        </div>
      </Skeleton>
    </div>
  </div>
}

function AdminBlogs(props) {
  const [blogs, setBlogs] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keywords, setKeywords] = useState(searchParams.get('keywords') || '');
  const [showDeleted, setShowDeleted] = useState(false);
  const [alertText, setAlertText] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchData(){
    setFetched(false)

    try{
      const reponse = await customAxios.get(`blogs?keywords=${keywords}`);
      setBlogs(reponse.data);
    }
    catch(error) {
      console.error(error)
      setAlertText("Quelque chose s'est mal passé");

      if(error.response?.status === 401) {
          dispatch(logout())
          navigate(switchToUrlBaseOnUserRole('admin').loginPage)
      }
    }

    setFetched(true)
  }

  useEffect(() => {
    fetchData()

    document.title = "Blogs | Adminstrateur"
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
          <nav>
              <ul className="flex gap-3 bg-secondary items-center py-2 px-4 font-mono">
                <li><Link className="hover:underline" to="ajouter">Ajouter</Link></li>
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
            <div className="font-semibold mb-1">{fetched ? (blogs.length ? `Resultat: ${blogs.length}` : "Aucun Blog trouvé") : "Recherche..."}</div>

            <div>
              {
                fetched
                ? 
                blogs.map(blog => <Blog key={blog.id} blogData={blog} fetchData={fetchData} setAlertText={setAlertText} />)
                :
                <div>{Array.from({ length: 20 }, (_, i) => i + 1).map((_, ind) => <BlogSkeleton key={ind} />)}</div>
              }
            </div>
          </div>
        </div>

        </div>  
      </div>
  );
}

export default AdminBlogs;