import React, {useEffect, useState} from 'react';
import Profile from "../../components/Profile";
import Alert from '../../components/Alert';
import AdminSideBare from '../../components/AdminSideBar';
import { customAxios } from '../../api/customAxios';
import { useSelector } from 'react-redux';
import { formatDate } from "../../functions/formatDate";

export default function Payement() {
  const [alertText, setAlertText] = useState('');
  const { token } = useSelector(slice => slice.user);
  const [payements, setPayements] = useState([]);

  async function fetchData() {
    const response = await customAxios.get('/payment-tranches', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
        }
    });

    setPayements(response.data);
  }
  
  useEffect(() => {
    document.title = "Paimenent | Adminstrateur"
    fetchData();
  }, [])

  return (
    <div className="flex">
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}
      <AdminSideBare activeItem={6} />

      <div className='m-4 w-full md:px-10'>
        <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-1">Paiement</h4>
            </div>

            <Profile />
        </div>

        <div className='my-10'>
          <p className='label-1'>Resultat: {payements.length}</p>
          <table className='tabel-1'>
            <thead>
              <tr>
                <th>#Id</th>
                <th>Method</th>
                <th>Pour Etudiant</th>
                <th>Payé a</th>
                <th>Verifié a</th>
                <th>Verifier</th>
              </tr>
            </thead>

            <tbody>
            {payements.map((p, ind) => {
              return (
                <tr key={ind}>
                  <td>{p.id}</td>
                  <td>{p.payment_method}</td>
                  <td>{p.registration_id}</td>
                  <td>{formatDate(p.created_at)}</td>
                  <td>{p.verified_at && formatDate(p.verified_at)}</td>
                  <td>{!p.verified_at && <button className='button-1'>Verifier</button>}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>



        </div>  
      </div>
  );
}