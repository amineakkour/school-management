import { useEffect } from "react";
import LoginLayout from "../../Layout/LoginLayout";
import imageURL from "../../assets/admin.jpg";
import tmpImgURL from "../../assets/sm_admin.jpg";

function AdminLogin() {

  const redirectSpaces = [
    { label: "Enseignant", path: "/connexion/enseignant" }, 
    { label: "Etudiant", path: "/connexion/etudiant" }, 
  ];

  useEffect(() => {
    document.title = "Connexion | Adminstrateur"
  }, [])

  return <LoginLayout bgColor="bg-yellow-200" userSpace="Adminstrateur" tmpImgURL={tmpImgURL} imgURL={imageURL}  formPath="/api/login" redirectSpaces={redirectSpaces} />
}

export default AdminLogin;