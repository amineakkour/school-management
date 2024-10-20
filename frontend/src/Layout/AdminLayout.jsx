import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { customAxios } from '../api/customAxios';
import Spinner from '../components/Spinner';
import { logout } from '../redux/features/userSlice';

function AdminLayout() {
  const user = useSelector(slice => slice.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  async function checkApiTokenIsValid() {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`
    };
    try{
      const response = await customAxios.post("user", {}, { headers });
      setIsLoaded(true);
    }catch(error) {
      setIsLoaded(false);
      dispatch(logout());
      console.error(error);
      navigate("/connexion/adminstrateur");
    }
  }
  
  useEffect(() => checkApiTokenIsValid, [location]);
  
  if (!isLoaded) return <Spinner />
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Outlet />
    </div>
  );
}

export default AdminLayout;