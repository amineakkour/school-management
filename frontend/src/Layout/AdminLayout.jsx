import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { switchToUrlBaseOnUserRole } from '../functions/switchToUrlBaseOnUserRole';

function AdminLayout() {
  const user = useSelector(slice => slice.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(user.role !== "admin" || !user.token){
      navigate(switchToUrlBaseOnUserRole('admin').loginPage, { replace: true })
    }

    setIsLoaded(true)
  }, [])
  
  if (!isLoaded) return ''
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Outlet />
    </div>
  );
}

export default AdminLayout;