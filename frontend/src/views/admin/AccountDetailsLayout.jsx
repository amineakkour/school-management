import React, { useState } from 'react';
import AdminSideBare from "../../components/AdminSideBar.jsx";
import Alert from "../../components/Alert.jsx";
import { useParams, Outlet, Link } from 'react-router-dom';
import Profile from "../../components/Profile.jsx";


export default function AccountDetailsLayout() {
    const [alertText, setAlertText] = useState("");
    const { id } = useParams();

    return (
        <div className="flex">
            {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}

            <AdminSideBare activeItem={3} />

            <div className='m-4 w-full md:px-10'>
                <div className="flex justify-between items-center">
                    <h4 className="text-2xl font-1">Details du compte</h4>
                    <Profile />
                </div>

                <div className='my-5 text-xs'>
                    <ul className="bg-secondary flex gap-1 py-2 px-4 font-mono">
                        <li><Link className="hover:underline" to='/adminstrateur/comptes'>Comptes</Link></li>
                        <li>{">"}</li>
                        <li>Details du compte</li>
                    </ul>
                </div>
                
                <Outlet />
            </div>
        </div>
    );
}
