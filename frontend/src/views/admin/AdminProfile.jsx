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


export default function AdminProfile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [alertText, setAlertText] = useState(''); 
  const [select, setSelect] = useState(searchParams.get('type') || 'students');
  const [search, setSearch] = useState(searchParams.get('recherche') || '');
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [lastPage, setLastPage] = useState(10);
  const { userInfos } = useSelector(slice => slice.user);
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(userInfos.first_name);
  const [lastName, setLastName] = useState(userInfos.last_name);
  const [birthdate, setBirthdate] = useState(userInfos.birthday);
  const [email, setEmail] = useState(userInfos.email);
  const [gender, setGender] = useState(userInfos.gender);

  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}

      <AdminSideBare activeItem={99} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Mon Profile</h4>
            </div>
            <Profile />
        </div>


        <div className="mt-20">
          <div className="p-3 rounded-md">
            
            <div className="md:grid grid-cols-2 gap-5">

              <div className="my-2 max-w-96">
                <label htmlFor="" className="label-1">Nom</label>
                <input type="text" className="input-2 " value={lastName} />
              </div>

              <div className="my-2 max-w-96 ">
                <label htmlFor="" className="label-1">Prenom</label>
                <input type="text" className="input-2" value={firstName} />
              </div>

              <div className="my-2 max-w-96 ">
                <label htmlFor="" className="label-1">Date de naissance</label>
                <input type="date" className="input-2" value={birthdate} />
              </div>

              <div className="my-2 max-w-96 ">
                <label htmlFor="" className="label-1">Sexe</label>
                {/* <input type="date" className="input-2" value={birthdate} /> */}

                <select name="gender" className="input-2" value={gender}>
                  <option value="m">Homme</option>
                  <option value="f">Femme</option>
                </select>
              </div>

              <div className="my-2 max-w-96 ">
                <label htmlFor="" className="label-1">Email</label>
                <input type="text" className="input-2" value={email} />
              </div>

              <div className="my-2 max-w-96 ">
                <label htmlFor="" className="label-1">Mot de passe</label>
                <input type="password" className="input-2" value={email} />
              </div>

            </div>

            <button className="button-2 mt-5" disabled={true}>Modifier</button>
          </div>
        </div>
      </div>  
    </div>
  );
}
