import {useEffect, useState} from 'react';
import Profile from "../../components/Profile";
import Alert from '../../components/Alert';
import AdminSideBare from '../../components/AdminSideBar';
import { customAxios } from '../../api/customAxios';
import { useSelector } from 'react-redux';
import { formatDate } from "../../functions/formatDate";
import { Checkbox } from "@/components/ui/checkbox"
import { useSearchParams } from "react-router-dom";



export default function Payement() {
  const [alertText, setAlertText] = useState('');
  const { token } = useSelector(slice => slice.user);
  const [payements, setPayements] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [getOnlyNotVerifiedPaiements, setGetOnlyNotVerifiedPaiements] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    setSearchParams({"not-verified": getOnlyNotVerifiedPaiements});
    fetchData();
  }, [getOnlyNotVerifiedPaiements])

  async function fetchData() {
    setIsFetched(false);
    setPayements([]);

    const response = await customAxios.get(`/payment-tranches?not-verified=${getOnlyNotVerifiedPaiements}`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
        }
    });
    
    setPayements(response.data);
    setIsFetched(true);
  }

  async function verify(id) {
    try{
      await customAxios.post('/payment-tranches-verify', {id}, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
          }
      });

      fetchData();
    }catch(error) {
      setAlertText("Quelque chose s'est mal passé");
      console.error(error)
    }
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
          <div className="my-2 hover:bg-secondary w-max p-2 rounded-md cursor-pointer" onClick={fetchData}><i className="fa-solid fa-arrows-rotate"></i> Refresh</div>

          <div className="flex items-center space-x-2 my-2">
            <Checkbox disabled={!isFetched} id="terms" checked={getOnlyNotVerifiedPaiements} onClick={e => setGetOnlyNotVerifiedPaiements(v => !v)}/>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Afficher uniquement les paiements non vérifiés
            </label>
          </div>

          
          <p className='label-1'>{isFetched && <>Resultat: {payements.length}</>}</p>

          <table className='table-3'>
            <thead>
              <tr>
                <th>#Id</th>
                <th>Method</th>
                <th>Etudiant</th>
                <th>Payé a</th>
                <th>Verifier</th>
              </tr>
            </thead>

            <tbody>
            {isFetched ? 
              payements.map((p, ind) => {
                return (
                  <tr key={ind}>
                    <td>{p.id}</td>
                    <td>{p.payment_method}</td>
                    <td>{p.registration_id}</td>
                    <td>{formatDate(p.created_at)}</td>
                    <td className=''>{p.verified_at ? formatDate(p.verified_at) : <button onClick={() => verify(p.id)} className=' bg-blue-500 px-1 py-2 rounded-sm text-white hover:font-bold w-20'>Verifier</button>}</td>
                  </tr>
                )
              })
              :
              <tr>
                <td colSpan={5}>Loading...</td>
            </tr> 
            }
            </tbody>
          </table>
        </div>



        </div>  
      </div>
  );
}