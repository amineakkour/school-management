import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate, Link } from "react-router-dom";
import { customAxios } from "../api/customAxios.js";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice.js";
import { useTheme } from "../context/ThemeProvider.tsx";
import { Sun } from "lucide-react";
import profilePictureNotFound from '../assets/profile_picture_not_found.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Profile({ profileUrl = '/adminstrateur/profile', profileDropDownItems = []}) {
  const { userInfos } = useSelector(slice => slice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {theme, setTheme} = useTheme();

  async function logoutCallBack() {
    try {
      const headers = {
        accept: 'application/json',
        Authorization: 'Bearer ' + user.token
      };
      const response = await customAxios.post("/logout", {}, { headers });
      
    } catch (error) {
      console.error('Error during logout:', error);
    }

    dispatch(logout());
    navigate("/");
  }

  return (
    <div className='flex items-center'>
      <DropdownMenu className='outline-none'>
        <DropdownMenuTrigger>
        <Avatar className="border">
          <AvatarImage src={userInfos?.profile ? userInfos?.profile : profilePictureNotFound} />
          <AvatarFallback>Photo de Profile de {userInfos?.first_name} {userInfos?.last_name}</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{userInfos?.gender === 'm' ? 'M.' : 'Mme.'} {userInfos?.last_name} </DropdownMenuLabel>
          <DropdownMenuSeparator />

          
          <DropdownMenuItem className="text-xs cursor-pointer">
            <Link to={profileUrl}><i className="fa-solid fa-user text-sm mr-1"></i> Mon Profile</Link>
          </DropdownMenuItem>

          {profileDropDownItems.map(item => <DropdownMenuItem key={item.text} className="text-xs cursor-pointer">
            <Link to={item.to}>{item.text}</Link>
          </DropdownMenuItem>)}

          
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs cursor-pointer">
            {
            theme === "dark" ?
              <span onClick={() => setTheme("light")}><i className="fa-solid fa-sun text-sm mr-1"></i> Mode lumière</span>
            :
              <span onClick={() => setTheme("dark")}><i className="fa-solid fa-moon mr-1 text-sm"></i> Mode Sombre </span>
            }
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs cursor-pointer" onClick={logoutCallBack}>
            <span><i className="fa-solid fa-right-from-bracket text-sm mr-1"></i>Deconnexion</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}