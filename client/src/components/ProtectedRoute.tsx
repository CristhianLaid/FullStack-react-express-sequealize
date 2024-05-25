import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

import { useAuthStore } from "../store";
import { useEffect } from "react";
import { verifyTokenRequest } from "../services";
import { Loading } from "./Loading";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, setAuthenticated, setLoading, setAuth } = useAuthStore((state) => state);
  const checkLogin = async () => {
    const cookies = Cookies.get();
    if (!cookies.token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    };

    try {
      const res = await verifyTokenRequest(cookies.token);
      if (!res.data.user) return setAuthenticated(false);
      setAuthenticated(true);
      setAuth(res.data.user);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer)
      
    } catch (error) {
      setAuthenticated(false);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogin();
    const cookies = Cookies.get();
    console.log(cookies)
  }, []);

  if (isLoading) return <Loading/>;
  if (!isAuthenticated && !isLoading) return <Navigate to="/login" replace />;
  return <Outlet />;
};