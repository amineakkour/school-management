import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { customAxios } from "../../api/customAxios";
import pp from "../../assets/excellent_student.jpg"

export default function ShowTeacherAccount() {
    const [isFetched, setIsFetched] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState({});
    const { token } = useSelector(slice => slice.user);
    
    async function fetchData() {
        setIsFetched(false);
        setData([]);
    
        try {
            const response = await customAxios.get(`/teachers/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            });

            setData(response.data);
            console.log(response.data);

        } catch(error) {
            console.error(error);
            setAlertText("Quelque chose s'est mal passé");
        }

        setIsFetched(true)
    }
    
    useEffect(() => {
        fetchData();
    }, [])
    
    if(!isFetched) return <Spinner />
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-4xl">#{data.id} {data.last_name} {data.first_name}</h2>
                <img src={pp} alt="photo de profile" className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover cursor-pointer" />
            </div>
            
            <div>
                <table className="my-4 text-sm md:text-base w-full max-w-6xl">
                    <tbody>
                        <tr className="border-b border-secondary">
                            <th className="text-start py-2 md:w-[40%]">#ID</th>
                            <td className="w-10">:</td>
                            <td>{data.id}</td>
                        </tr>

                        <tr className="border-b border-secondary">
                            <th className="text-start py-2">CIN</th>
                            <td>:</td>
                            <td>{data.cin}</td>
                        </tr>

                        <tr className="border-b border-secondary">
                            <th className="text-start py-2">Nom</th>
                            <td>:</td>
                            <td>{data.last_name}</td>
                        </tr>

                        <tr className="border-b border-secondary">
                            <th className="text-start py-2">Prénom</th>
                            <td>:</td>
                            <td>{data.first_name}</td>
                        </tr>

                        <tr className="border-b border-secondary">
                            <th className="text-start py-2">Email</th>
                            <td>:</td>
                            <td>{data.email}</td>
                        </tr>

                        <tr className="border-b border-secondary">
                            <th className="text-start py-2">Numéro de téléphone</th>
                            <td>:</td>
                            <td>{data.phone_number}</td>
                        </tr>

                        <tr className="border-b border-secondary">
                            <th className="text-start py-2">Date de naissance</th>
                            <td>:</td>
                            <td>{data.birthday}</td>
                        </tr>

                        <tr className="border-b border-secondary">
                            <th className="text-start py-2">Sex</th>
                            <td>:</td>
                            <td>{data.gender === "m" ? "Homme" : "Femme"}</td>
                        </tr>

                        <tr className="border-b border-secondary">
                            <th className="text-start py-2">Handicap</th>
                            <td>:</td>
                            <td>{data.has_disability ? "Oui" : "Non"}</td>
                        </tr>

                        {showMore && <>
                            {data.has_disability && <tr className="border-b border-secondary">
                                <th className="text-start py-2">Type handicape</th>
                                <td>:</td>
                                <td>{data.disability_type}</td>
                            </tr>}

                            <tr className="border-b border-secondary">
                                <th className="text-start py-2">Addresse</th>
                                <td>:</td>
                                <td>{data.address}</td>
                            </tr>

                            <tr className="border-b border-secondary">
                                <th className="text-start py-2">Role</th>
                                <td>:</td>
                                <td>{data.role}</td>
                            </tr>

                            <tr className="border-b border-secondary">
                                <th className="text-start py-2">Groupe sanguin</th>
                                <td>:</td>
                                <td>{data.blood_type}</td>
                            </tr>

                            {data.deleted_at && <tr className="border-b border-secondary">
                                <th className="text-start py-2">Supprimé le</th>
                                <td>:</td>
                                <td>{data.deleted_at}</td>
                            </tr>}

                            {data.hire_date && <tr className="border-b border-secondary">
                                <th className="text-start py-2">Date d'embauche</th>
                                <td>:</td>
                                <td>{data.hire_date}</td>
                            </tr>}

                            <tr className="border-b border-secondary">
                                <th className="text-start py-2">Dérnier vu</th>
                                <td>:</td>
                                <td>{data.last_seen}</td>
                            </tr>
                            
                            <tr className="border-b border-secondary">
                                <th className="text-start py-2">Compte créé</th>
                                <td>:</td>
                                <td>{data.created_at}</td>
                            </tr>

                            <tr className="border-b border-secondary">
                                <th className="text-start py-2">Dérnier modification</th>
                                <td>:</td>
                                <td>{data.updated_at}</td>
                            </tr>
                        </>}
                    </tbody>

                </table>


                <button onClick={() => setShowMore(v => !v)} className="text-white rounded-md px-4 py-2 bg-blue-500 duration-300">
                    {showMore ? <><i className="fa-solid fa-minus"></i> Réduire</> : <><i className="fa-solid fa-plus"></i> Afficher Plus</>}
                </button>
            </div>
            
            <div className="mt-9 flex gap-2">
                <button className="text-white rounded-md px-4 py-2 bg-yellow-500 hover:bg-red-500 duration-300"><i className="fa-solid fa-pen"></i> Modifier</button>
                <button className="text-white rounded-md px-4 py-2 bg-red-500 hover:bg-red-600 duration-300"><i className="fa-solid fa-trash"></i> Supprimer</button>
            </div>
        </div>
    );
}