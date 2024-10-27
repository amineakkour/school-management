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


export default function AddNewAdmin() {
  const [alertText, setAlertText] = useState(''); 
  const { token } = useSelector(slice => slice.user);
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchData(event) {
    event?.preventDefault();
    var data = [];
  
    setIsFetched(false);
    setAccounts([]);

    try {
      const response = await customAxios.post(`students`, data, {
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
      setAlertText("Quelque chose s'est mal passé");
    }
    setIsFetched(true)
  }

  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}

      <AdminSideBare activeItem={3} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Ajouter Adminstrateur</h4>
            </div>
            <Profile />
        </div>

        <div className='my-5 text-xs'>
          <ul className="bg-secondary flex gap-1 py-2 px-4 font-mono">
            <li><Link className="hover:underline" to='/adminstrateur/comptes'>Comptes</Link></li>
            <li>{">"}</li>
            <li>Ajouter adminstrateur</li>
          </ul>
        </div>

        <div>

            <div className='min-h-60'>
              {isFetched ? 
              <>  
                <div className='label-1'>Resultat: {accounts.length}</div>
                <div>{accounts.map((account, ind) => <Account key={ind} accountData={account} />)}</div>
              </>
              : <p><Spinner /> Recherche...</p> 
            }
            </div>

        </div>

      </div>  
    </div>
  );
}
