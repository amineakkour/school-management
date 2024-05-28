import LoginLayout from "../../Layout/LoginLayout";
import imageURL from "../../assets/student.jpg";
import tmpImgURL from "../../assets/sm_student.jpg";
import { useEffect } from "react";

function StudentLogin() {

  const redirectSpaces = [
    { label: "Adminstrateur", path: "/connexion/adminstrateur" }, 
    { label: "Enseignant", path: "/connexion/enseignant" }, 
  ];

  useEffect(() => {
    document.title = "Connexion | Etudiant"
  }, [])

  return <LoginLayout bgColor="bg-green-200" userSpace="Etudiant" tmpImgURL={tmpImgURL} imgURL={imageURL} formPath="/student/login" nextPath="./etudiant/tableau-de-bord" redirectSpaces={redirectSpaces} />
}

export default StudentLogin;