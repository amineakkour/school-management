import LoginLayout from "../../Layout/LoginLayout";
import imageURL from "../../assets/teacher.jpg";
import tmpImgURL from "../../assets/sm_teacher.jpg";
import { useEffect } from "react";

function TeacherLogin() {

  const redirectSpaces = [
    { label: "Etudiant", path: "/connexion/etudiant" }, 
    { label: "Adminstrateur", path: "/connexion/adminstrateur" }, 
  ];

  useEffect(() => {
    document.title = "Connexion | Enseignant"
  }, [])

  return <LoginLayout bgColor="bg-blue-200" userSpace="Enseignant" tmpImgURL={tmpImgURL} imgURL={imageURL} formPath="/teacher/login" redirectSpaces={redirectSpaces} />
}

export default TeacherLogin;