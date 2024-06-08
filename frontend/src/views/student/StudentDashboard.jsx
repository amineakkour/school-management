import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from '../../api/customAxios';

function StudentDashboard(props) {
  const { token } = useSelector(slice => slice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logoutCallBack() {
    try{
      const response = await customAxios.post('logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response)
    }catch(error){
      console.error(error)
    }

    dispatch({type: "user/logout"});
    navigate("/");
  }

  return (
    <div className='p-2'>
      <ul>
        <li onClick={logoutCallBack} className="underline text-blue-700 cursor-pointer">Log out</li>
      </ul>
      <div>Bonjour Etudiant</div>
    </div>
  );
}

export default StudentDashboard;