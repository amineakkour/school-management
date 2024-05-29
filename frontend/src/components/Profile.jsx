import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate, Link } from "react-router-dom";
import { customAxios } from "../api/customAxios.js";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




export default function Profile({ profilePicture, profileName, profileDropDownItems = []}) {
  const user = useSelector(slice => slice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <DropdownMenu>
        <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={profilePicture} />
          <AvatarFallback>Photo de Profile de {profileName}</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{profileName}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {profileDropDownItems.map(item => <DropdownMenuItem key={item.text} className="text-xs cursor-pointer">
            <Link to={item.to}>{item.text}</Link>
          </DropdownMenuItem>)}

          <DropdownMenuItem className="text-xs cursor-pointer" onClick={logoutCallBack}>Deconnexion</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}