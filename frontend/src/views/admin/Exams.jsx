import React, { useState, useEffect } from 'react';
import Profile from "../../components/Profile";
import Alert from '../../components/Alert';
import AdminSideBare from '../../components/AdminSideBar';

export default function Exams() {
  const [alertText, setAlertText] = useState('');

  useEffect(() => {
    document.title = "Exams | Adminstrateur"
  }, [])

  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}
      <AdminSideBare activeItem={10} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Exams</h4>
            </div>

            <Profile />
        </div>



        </div>  
      </div>
  );
}