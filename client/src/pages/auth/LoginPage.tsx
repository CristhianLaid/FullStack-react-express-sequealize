import { useNavigate } from "react-router-dom";
import { UserDataResponse } from "../../models";
import { Login } from "../../services";
import { useAuthStore } from "../../store";
import { AuthFooter, AuthHeader, Cart, FormAuth } from "./components";
import { useEffect } from "react";
import { Message } from "../../components";


export const LoginPage = () => {
    const { setAuth, setLogin, setError, isAuthenticated, errors } = useAuthStore((state) => state);
    const navigate = useNavigate();

    const onSubmit = async (data: UserDataResponse) => {
        try {
            const res = await Login(data);
            const token = res.data.token;
            const auth = res.data.user;
            setLogin(token);
            setAuth(auth)
        } catch (error:any) {
            setError(error.response.data.message)
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (errors.length > 0) {
            const time = setTimeout(() => {
                setError([]);
            }, 5000)
            return () => clearTimeout(time)
        }
    }, [errors])

    return (
        <Cart>
            <AuthHeader />
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {errors.map((error, i) => (
                    <Message message={error} key={i}/>
                ))}
                <FormAuth onSubmit={onSubmit} buttonText="Login" />
                <AuthFooter isLogin="Login" />
            </div>
        </Cart>
    );
};
