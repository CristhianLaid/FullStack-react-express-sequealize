
import { Credentials, UserData, DataResponse } from "../../models";
import { credentialAdapter, userAdapter } from "../../adapters";
import axios from "../../config/axiosConfig";



export const Register = async (userData: UserData): Promise<DataResponse> => {
    return await axios.post(`/auth/register`, userAdapter(userData));
};

export const Login = async (credentials: Credentials): Promise<DataResponse> => {
    return await axios.post(`/auth/login`, credentialAdapter(credentials));
};

export const Logout = async (): Promise<void> => await axios.get(`/auth/logout`);

export const verifyTokenRequest = async (token:string): Promise<DataResponse> => {
    return await axios.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
};





