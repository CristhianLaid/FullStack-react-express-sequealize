import { FaUser } from "react-icons/fa";
import { IoBookOutline, IoAddOutline } from "react-icons/io5";
import { SliceBarMenu } from './SliceBarMenu';
import { FaUserAltSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";
import Cookies from 'js-cookie';

const menuItem = [
  {
    path: "/profile",
    icon: <FaUser size={16} />,
    name: "Profile",
  },
  {
    path: "/tasks",
    icon: <IoBookOutline size={16} />,
    name: "Task",
  },
  {
    path: "/addTask",
    icon: <IoAddOutline size={16} />,
    name: "Add Task",
  },
  // {
  //   path: "/logout",
  //   icon: <FaUserAltSlash size={16}/>,
  //   name:' Sign Out'
  // }
];

export const SliceBar = () => {
  const setLogout = useAuthStore((state) => state.setLogout);

  const logout = () => {
    Cookies.remove("token");
    setLogout();
  }

  return (
    <>
      {menuItem.map((item: any) => (
        <SliceBarMenu key={item.path} {...item} />
      ))}
      <li>
        <Link to={'/'} onClick={() => logout()} className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
          <FaUserAltSlash size={16} />
          <span className="ml-3 flex-1 whitespace-nowrap">Sign Out</span>
        </Link>
      </li>
    </>
  );
};
