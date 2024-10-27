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


export default function AddNewStudent() {
  const [alertText, setAlertText] = useState(''); 
  const { token } = useSelector(slice => slice.user);
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}

      <AdminSideBare activeItem={3} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Ajouter Etudiant</h4>
            </div>
            <Profile />
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
