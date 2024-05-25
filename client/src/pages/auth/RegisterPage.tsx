import { useNavigate } from "react-router-dom";
import { UserDataResponse } from "../../models";
import { useAuthStore } from "../../store";
import { AuthFooter, AuthHeader, Cart, FormAuth } from "./components";
import { useEffect } from "react";
import { Register } from "../../services";
import { Message } from "../../components";


export const RegisterPage = () => {
    const { setAuth, setLogin, setError ,isAuthenticated, errors } = useAuthStore((state) => state);
    const navigate = useNavigate();

    const onSubmit = async (data: UserDataResponse) => {
        try {
            const res = await Register(data);
            const token = res.data.token;
            const auth = res.data.user;
            console.log(auth)
            setLogin(token);
            setAuth(auth)
        } catch (error:any) {
            setError(error.response.data.message)
        };
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (errors.length > 0){
            const time = setTimeout(() => {
                setError([]);
            }, 5000);
            return () => clearTimeout(time);
        };
    }, [errors]);

    return (
        <Cart>
            <AuthHeader />
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {errors.map((error, index) => (
                    <Message message={error} key={index} />
                ))}
                <FormAuth onSubmit={onSubmit} buttonText="Register" isRegister />
                <AuthFooter />
            </div>
        </Cart>
    );
};