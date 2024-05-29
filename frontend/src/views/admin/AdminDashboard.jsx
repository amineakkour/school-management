import React, { useState, useEffect, useReducer} from 'react';
import { Link } from "react-router-dom";
import AdminSideBar from "../../components/AdminSideBar";
import Profile from "../../components/Profile";
import { customAxios } from '../../api/customAxios';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';


function Card({ children, title, handelClickOnSettings }) {
  return (
    <div className="w-full shadow-xl p-2 md:p-5 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          <i className="fa-solid fa-ellipsis-vertical cursor-pointer p-2" onClick={handelClickOnSettings}></i>
      </div>
      {children}
    </div>
  )
}

export default function AdminDashboard() {
  var [frenchDate, setFrenchDate] = useState(null);
  const user = useSelector(slice => slice.user);
  const [studentCounter, setStudentCounter] = useState(null);
  const [adminCounter, setAdminAcounter] = useState(null);
  const [teacherCounter, setTeacherCounter] = useState(null);

  async function fetchData() {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + user.token
    };
  
    try {
      const adminRequest = customAxios.get('admin', { headers });
      const studentsRequest = customAxios.get('student', { headers });
      const teacherRequest = customAxios.get('teacher', { headers });

      const [adminResponse, studentsResponse, teacherResponse] = await Promise.all([adminRequest, studentsRequest, teacherRequest]);

      setStudentCounter(studentsResponse.data.length);
      setAdminAcounter(adminResponse.data.length);
      setTeacherCounter(teacherResponse.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    setFrenchDate(date.toLocaleDateString('fr-FR', options));
  }, [])

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="flex max-w-screen-2xl mx-auto">
      <AdminSideBar />

      <div className="m-4 w-full md:px-10">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-2xl font-1">Heureux de vous revoir!</h4>
            <div className="text-xs text-gray-500">{frenchDate}</div>
          </div>
          
          <Profile profilePicture={"https://github.com/shadcn.png"} profileName={"El Mouda Amine"} profileDropDownItems={[{text: "Mon Profile", to: "/adminstrateur/profile"}]} />

        </div>

        <div className="mt-5">
          
          <div className="grid md:grid-cols-3 gap-5">
            <Card title={"Etudiants"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              
              <p className="text-lg font-semibold">
                {studentCounter ? 
                <>{studentCounter}/{studentCounter + teacherCounter + adminCounter} <span className="text-xs">comptes</span></>
                : <><Spinner /> <span className='text-xs'>Loading...</span></>}
              </p>

              <div><Link className="link-1" to="">Créer compte</Link></div>
            </Card>
            
            <Card title={"Enseignants"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <p className="text-lg font-semibold">
                {teacherCounter ? 
                <>{teacherCounter}/{studentCounter + teacherCounter + adminCounter} <span className="text-xs">comptes</span></>
                : <><Spinner /> <span className='text-xs'>Loading...</span></>}
              </p>
              <div><Link className="link-1" to="">Créer compte</Link></div>
            </Card>

            <Card title={"Adminstrateur"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <p className="text-lg font-semibold">
                {adminCounter ? 
                <>{adminCounter}/{studentCounter + teacherCounter + adminCounter} <span className="text-xs">comptes</span></>
                : <><Spinner /> <span className='text-xs'>Loading...</span></>}
              </p>
              <div><Link className="link-1" to="">Créer compte</Link></div>
            </Card>

          </div>

          <div className="my-8">
            <Card title={"Paiements non vérifié"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <table className="tabel-1 mt-2 md:mt-4 text-[9px] md:text-xs">
                <thead>
                  <tr>
                    <th>Nom Complet</th>
                    <th>Date de Paimenet</th>
                    <th>Tranche</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>Amine Akkour</td>
                    <td>2023/09/01</td>
                    <td>5</td>
                    <td>5000 Dhs</td>
                    <td><Link to="">Afficher</Link></td>
                  </tr>

                  <tr>
                    <td>Amine Akkour</td>
                    <td>2023/09/01</td>
                    <td>5</td>
                    <td>5000 Dhs</td>
                    <td><Link to="">Afficher</Link></td>
                  </tr>

                  <tr>
                    <td>Amine Akkour</td>
                    <td>2023/09/01</td>
                    <td>5</td>
                    <td>5000 Dhs</td>
                    <td><Link to="">Afficher</Link></td>
                  </tr>

                  <tr>
                    <td>Amine Akkour</td>
                    <td>2023/09/01</td>
                    <td>5</td>
                    <td>5000 Dhs</td>
                    <td><Link to="">Afficher</Link></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          <div className="my-8">
            <Card title={"Derniers Messages"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              <ul className="text-base mt-2 md:mt-4 text-[11px] md:text-xs">
                <li className="px-1 py-2 my-1 bg-stone-50 hover:underline">
                  <Link to="" className="flex items-center gap-5 ">
                    <div className=''>25-09-2012</div>
                    <h5 className="">Lorem ipsum dolor sit amet.</h5>
                  </Link>
                </li>

                <li className="px-1 py-2 my-1 bg-stone-100 hover:underline">
                  <Link to="" className="flex items-center gap-5 ">
                    <div className=''>25-09-2012</div>
                    <h5 className="">Lorem ipsum dolor sit amet.</h5>
                  </Link>
                </li>

                <li className="px-1 py-2 my-1 bg-stone-50 hover:underline">
                  <Link to="" className="flex items-center gap-5 ">
                    <div className=''>25-09-2012</div>
                    <h5 className="">Lorem ipsum dolor sit amet.</h5>
                  </Link>
                </li>

                <li className="px-1 py-2 my-1 bg-stone-100 hover:underline">
                  <Link to="" className="flex items-center gap-5 ">
                    <div className=''>25-09-2012</div>
                    <h5 className="">Lorem ipsum dolor sit amet.</h5>
                  </Link>
                </li>

              </ul>
            </Card>
          </div>


        </div>
      </div>
    </div>
  );
}
