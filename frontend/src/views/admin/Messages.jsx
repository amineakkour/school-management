import React, { useState, useEffect } from 'react';
import Profile from "../../components/Profile";
import Alert from '../../components/Alert';
import AdminSideBare from '../../components/AdminSideBar';
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../../api/customAxios.js";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice.js";
import { switchToUrlBaseOnUserRole } from '../../functions/switchToUrlBaseOnUserRole.js';
import { formatDate } from "../../functions/formatDate.js";
import Spinner from "../../components/Spinner";

function MessageRow({ mes, token, fetchData, setFetched }) {
  const [opened, setOpened] = useState(false);

  async function markMessageAsSeen(event, messageId, seen_at) {
    event.stopPropagation();

    if(seen_at) return false

    setFetched(false)

    try{
      await customAxios.put(`/messages/${messageId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      sessionStorage.removeItem('messages');
      
    }catch(error) {
      console.error(error)
    }
    
    fetchData()
  }

  return (
    <>
      <tr onClick={() => setOpened(v => !v)} className="hover:bg-secondary cursor-pointer">
        <td>{mes.id}</td>
        <td>{mes.name}</td>
        <td>{mes.title}</td>
        <td>{mes.phone_number}</td>
        <td>{formatDate(mes.created_at)}</td>
        <td onClick={e => markMessageAsSeen(e, mes.id, mes.seen_at)} className={`${mes.seen_at ? '' : 'active:bg-stone-600 hover:outline outline-2' }`} title={mes.seen_at ? 'lu' : "Marquer comme lu"}><div className={`outline outline-2 w-3 h-3 rounded-full ${mes.seen_at ? 'bg-green-500' : 'bg-red-500'} bg-black`}></div></td>
      </tr>
      {opened && (
        <tr className="bg-secondary">
          <td colSpan={6}><p className='min-h-10 flex justify-center items-center'>{mes.message}</p></td>
        </tr>
      )}
    </>
  )
}

export default function Messages() {
  const [alertText, setAlertText] = useState('');
  const [fetched, setFetched] = useState(false);
  const [messages, setMessages] = useState([]);
  const { token } = useSelector(slice => slice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchData(){
    setFetched(false)
    setMessages([])

    try{
      const response = await customAxios.get(`messages`, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
          }
      });
      setMessages(response.data);
    }
    catch(error) {
      console.error(error)
      setAlertText("Quelque chose s'est mal passé");

      if(error.response?.status === 401) {
          dispatch(logout())
          navigate(switchToUrlBaseOnUserRole('admin').loginPage)
      }
    }

    setFetched(true)
  }

  useEffect(() => {
    fetchData();

    document.title = "Messages | Adminstrateur"
  }, [])
  
  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}
      <AdminSideBare activeItem={4} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Messages</h4>
            </div>

            <Profile />
        </div>

        <div className="mt-5">

          <div className="my-2 hover:bg-secondary w-max p-2 rounded-md cursor-pointer" onClick={fetchData}><i className="fa-solid fa-arrows-rotate"></i> Refresh</div>

          <table className="table-3">
            <thead>
              <tr>
                <th>#Id</th>
                <th>Nom Complet</th>
                <th>Titre de message</th>
                <th>Numero de telephone</th>
                <th>Envoyé le</th>
                <th>Marquer commme lu</th>
              </tr>
            </thead>

            <tbody>
              
              {fetched ? 
                messages.map((mes, ind) => {
                  return (
                    <MessageRow key={ind} mes={mes} token={token} setFetched={setFetched} fetchData={fetchData} />
                  )
                })
              : <tr>
                  <td colSpan={6}>
                    <Spinner />
                  </td>
                </tr>
              }

            </tbody>
          </table>
        </div>



        </div>  
      </div>
  );
}