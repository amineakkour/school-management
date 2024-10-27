import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { customAxios } from '../../api/customAxios.js';
import AdminSideBare from "../../components/AdminSideBar.jsx";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Profile from "../../components/Profile.jsx";
import { useDispatch, useSelector } from 'react-redux';
import Alert from "../../components/Alert";
import { logout } from '../../redux/features/userSlice.js';
import { switchToUrlBaseOnUserRole } from '../../functions/switchToUrlBaseOnUserRole.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import guestPicture from "../../assets/profile_picture_not_found.jpg";
import Paginate from '../../components/Paginate.jsx';
import Spinner from "../../components/Spinner.jsx";


function Account({ accountData }) {
  function swtichRoleToFrench() {
    switch (accountData.role) {
      case "teacher": return "enseignant"
      case "admin": return "adminstrateur"
      default: return "etudiant";
    }
  }

  return (
    <Link to={`afficher/${swtichRoleToFrench()}/${accountData.id}`} className="bg-secondary rounded-sm my-2 p-2 flex gap-3 justify-between items-center cursor-pointer">
      <div><img src={guestPicture} className='w-12 h-12 rounded-full object-cover' alt="Profile picture of ${accountData.id}" /></div>

      <div className='w-full'>
        <h3 className='text-xl font-semibold font-1'>#{accountData.id} {accountData.last_name} {accountData.first_name}</h3>
        <div>Email: {accountData.email}</div>
        <div className='flex items-center gap-0.5 text-green-600 text-xs'><div className='w-1.5 h-1.5 bg-green-600 inline-block rounded-full'></div>Connecté</div>
      </div>
    </Link>
  )
}


export default function Accounts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [alertText, setAlertText] = useState(''); 
  const [select, setSelect] = useState(searchParams.get('type') || 'students');
  const [search, setSearch] = useState(searchParams.get('recherche') || '');
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [lastPage, setLastPage] = useState(10);
  const { token } = useSelector(slice => slice.user);
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchData(event) {
    event?.preventDefault();
  
    setIsFetched(false);
    setAccounts([]);

    try {
      const response = await customAxios.get(`/${select}?page=${page}&search=${search}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      setAccounts(response.data.data);
      setLastPage(response.data.last_page);

    } catch(error) {
      console.error(error);

      if(error.response?.status == 401) {
        dispatch(logout())
        navigate(switchToUrlBaseOnUserRole('admin').loginPage)
      }
      else{
        setAlertText("Quelque chose s'est mal passé");
      }
    }
    setIsFetched(true)
  }
  
  useEffect(() => {
    fetchData();
  }, [select, page])

  useEffect(() => {
    setSearchParams({recherche: search, type: select, page});
  }, [search, select, page])

  useEffect(() => {
    document.title = "Comptes | Adminstrateur";
  },  [])

  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}

      <AdminSideBare activeItem={3} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Comptes</h4>
            </div>
            <Profile />
        </div>

        <div className='my-5'>
          <ul className="bg-secondary flex py-2 px-4 font-mono gap-4f">
            <li>Ajouter: </li>
            <div className="flex gap-2">
              <li><Link className="hover:underline" to='ajouter/etudiant'>Etudiant</Link></li> |
              <li><Link className="hover:underline" to='ajouter/enseignant'>Enseignant</Link></li> |
              <li><Link className="hover:underline" to='ajouter/adminstrateur'>Adminstrateur</Link></li>
            </div>
          </ul>
        </div>

        <div>
          <div>
            <form onSubmit={fetchData} className='md:flex gap-2 mb-5'>
              <Input type="text" placeholder="Rechercher par nom ou identifiant" className="mb-2" value={search} onChange={e => setSearch(e.target.value)} />

              <Select onValueChange={setSelect}>
                <SelectTrigger className="md:w-96">
                  <SelectValue placeholder="Type Comptes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="students">Etudiants</SelectItem>
                  <SelectItem value="teachers">Enseignants</SelectItem>
                  <SelectItem value="admins">Adminstrateur</SelectItem>
                </SelectContent>
              </Select>
            </form>

          </div>


            <div className='min-h-60'>
              {isFetched ? 
              <>
                <div className='label-1'>Resultat: {accounts.length}</div>
                <div>{accounts.map((account, ind) => <Account key={ind} accountData={account} />)}</div>
              </>
              : <p><Spinner /> Recherche...</p> 
            }
            </div>

          <div className="mt-20">
            <Paginate lastPage={lastPage} activePage={page} setPage={setPage}/>
          </div>
        </div>

      </div>  
    </div>
  );
}
