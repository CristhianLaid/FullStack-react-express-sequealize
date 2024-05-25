import { Link } from "react-router-dom"

interface LoginOrRegister {
    isLogin?: string;
}

export const AuthFooter = ({ isLogin }: LoginOrRegister) => {
    const oppositePath = isLogin === 'Login' ? 'register' : 'login';
    const firstLettersCapitalize = oppositePath.charAt(0).toUpperCase() + oppositePath.slice(1);
    return (
        <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={`/${oppositePath}`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                {/* {(isLogin === 'Login') ? 'Register': 'Login'} */}
                {firstLettersCapitalize}
            </Link>
        </p>
    );
};