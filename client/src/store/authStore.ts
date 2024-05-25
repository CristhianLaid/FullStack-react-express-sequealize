import { create } from 'zustand'
import { UserDataResponse } from '../models';

type State = {
  token: string;
  auth: UserDataResponse;
  isAuthenticated: boolean;
  isLoading: boolean;
  errors: string[];
};

type Actions = {
  setLogin(token:State['token']):void;
  setAuth(auth:State['auth']):void;
  setAuthenticated(isAuthenticated:State['isAuthenticated']):void;
  setLoading(isLoanding:State['isLoading']):void;
  setLogout():void;
  setError(error:any):void;
};

export const useAuthStore = create<State & Actions>((set) => ({
    token: '',
    isAuthenticated: false,
    isLoading: true,
    auth: {
        id: 0,
        username: '',
        email: '',
        password: '',
        createdAt: '',
        updatedAt: '',
    },
    errors: [],
    setLogin: (token:State['token']) => set({token, isAuthenticated:true}),
    setAuth: (auth:State['auth']) => set({auth}),
    setAuthenticated: (isAuthenticated:State['isAuthenticated'])=> set({isAuthenticated}),
    setLoading: (isLoading:State['isLoading']) => set({isLoading}),
    setLogout: () => set({
      token: '',
      isAuthenticated: false,
      isLoading: true,
      auth: {
        id: 0,
        username: '',
        email: '',
        password: '',
        createdAt: '',
        updatedAt: '',
      }
    }),
    setError: (errors) => set({errors})
}));

