import React, {useState} from 'react';
import Profile from "../../components/Profile";
import Alert from '../../components/Alert';
import AdminSideBare from '../../components/AdminSideBar';

export default function Notes() {
  const [alertText, setAlertText] = useState('');

  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}
      <AdminSideBare activeItem={11} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Notes</h4>
            </div>

            <Profile />
        </div>



        </div>  
      </div>
  );
}