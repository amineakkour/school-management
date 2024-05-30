import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/AdminSideBar";
import Profile from "../../components/Profile";
import { customAxios } from '../../api/customAxios';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import Alert from "../../components/Alert";
import { switchToUrlBaseOnUserRole } from '../../functions/switchToUrlBaseOnUserRole';
import { logout } from '../../redux/features/userSlice';
import { formatDate } from "../../functions/formatDate";


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
  const [alertText, setAlertText] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [studentCounter, setStudentCounter] = useState(null);
  const [adminCounter, setAdminAcounter] = useState(null);
  const [teacherCounter, setTeacherCounter] = useState(null);
  const [paymentTranches, setPaymentTranches] = useState(null);
  const [messages, setMessages] = useState(null);

  async function fetchData() {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + user.token
    };
  
    try {
      const adminRequest = customAxios.get('admins-counter', { headers });
      const studentsRequest = customAxios.get('students-counter', { headers });
      const teacherRequest = customAxios.get('teachers-counter', { headers });

      const paymentTranches = await customAxios.get('payment-tranches?limit=6', { headers });
      const messages = await customAxios.get('messages?limit=6&seen=false', { headers });
      const [adminResponse, studentsResponse, teacherResponse] = await Promise.all([adminRequest, studentsRequest, teacherRequest]);

      
      setMessages(messages.data)
      setPaymentTranches(paymentTranches.data);
      setTeacherCounter(teacherResponse.data);
      setStudentCounter(studentsResponse.data);
      setAdminAcounter(adminResponse.data);
      
    } catch (error) {
      console.error(error);
      setAlertText("Quelque chose s'est mal passé");

      if(error.response?.status === 401) {
          dispatch(logout())
          navigate(switchToUrlBaseOnUserRole('admin').loginPage)
      }
    }
  }

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    setFrenchDate(date.toLocaleDateString('fr-FR', options));
  }, [])

  useEffect(() => {fetchData()}, [])  

  return (
    <div className="flex max-w-screen-2xl mx-auto">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}
      
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
              {!paymentTranches ? 
                <div className=''><Spinner /> Loading...</div>
              : 
              <table className="tabel-1 mt-2 md:mt-4 text-[9px] md:text-xs">
                <thead>
                  <tr>
                    <th>#id</th>
                    <th>Etudiant</th>
                    <th>Méthode</th>
                    <th>Payer a</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paymentTranches.map((tranche, ind) => 
                    (<tr key={ind}>
                      <td>{tranche.id}</td>
                      <td>{tranche.registration_id}</td>
                      <td>{tranche.payment_method}</td>
                      <td>{formatDate(tranche.created_at)}</td>
                      <td><Link to="">Afficher</Link></td>
                    </tr>)
                  )}

                </tbody>
              </table>
              }
            </Card>
          </div>

          <div className="my-8 text-xs">
          <Card title={"Messages Non lus"} handelClickOnSettings={() => console.log("handelClickOnSettings")}>
              {!messages ? 
                <div className=''><Spinner /> Loading...</div>
              : 
              <table className="tabel-1 mt-2 md:mt-4 text-[9px] md:text-xs">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Objet</th>
                    <th>Envoyé a</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map((message, ind) => 
                    (<tr key={ind}>
                      <td>{message.name}</td>
                      <td>{message.title}</td>
                      <td>{formatDate(message.created_at)}</td>
                      <td><Link to="">Afficher</Link></td>
                    </tr>)
                  )}
                </tbody>
              </table>
              }
            </Card>
          </div>


        </div>
      </div>
    </div>
  );
}
