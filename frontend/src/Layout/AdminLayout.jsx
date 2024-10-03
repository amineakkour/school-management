import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { switchToUrlBaseOnUserRole } from '../functions/switchToUrlBaseOnUserRole';
import { customAxios } from '../api/customAxios';
import Spinner from '../components/Spinner';

function AdminLayout() {
  const user = useSelector(slice => slice.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if(user.role !== "admin" || !user.token){
  //     navigate(switchToUrlBaseOnUserRole('admin').loginPage, { replace: true })
  //   }

  //   setIsLoaded(true)
  // }, [])

  async function checkApiTokenIsValid() {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`
    };
    try{
      const response = await customAxios.post("user", {}, { headers });
      setIsLoaded(true);
    }catch(error) {
      console.error(error);
      setIsLoaded(false);
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