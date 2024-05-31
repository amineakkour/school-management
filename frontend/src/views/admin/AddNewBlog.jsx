import React, { useState, useEffect } from 'react';
import { customAxios } from '../../api/customAxios.js';
import AdminSideBare from "../../components/AdminSideBar.jsx";
import { Link, useSearchParams} from 'react-router-dom';
import Profile from "../../components/Profile.jsx";
import { Checkbox } from "@/components/ui/checkbox"

export default function AddNewBlog() {
  
  return (
    <div className="flex">
      <AdminSideBare activeItem={7} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Gestion de blogs</h4>
            </div>

            <Profile />
        </div>

        <div className='my-5'>
          <ul className="bg-secondary flex gap-1 py-2 px-4 font-mono">
            <li><Link className="hover:underline" to='../'>Blogs</Link></li>
            <li><Link to=''>{">"}</Link></li>
            <li>Ajouter</li>
          </ul>
        </div>

        </div>  
      </div>
  );
}