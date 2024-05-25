import { Link, useLocation } from "react-router-dom";

export interface MenuItem {
    path: string;
    icon: JSX.Element;
    name: string;
};


export const SliceBarMenu = ({ path, icon, name }: MenuItem) => {
    const location = useLocation();
    const isActive = location.pathname === path;
    return (
        <li>
            <Link to={path} className={`text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ${isActive ? 'bg-gray-100' : ''}`}>
                <div className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75">{icon}</div>
                <span className="ml-3 flex-1 whitespace-nowrap">{name}</span>
            </Link>
        </li>
    );
}
