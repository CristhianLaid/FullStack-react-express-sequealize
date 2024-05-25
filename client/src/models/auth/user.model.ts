export interface UserData {
  username?: string;
  email?: string;
  password?: string;
}

export interface UserDataResponse {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
};


export interface AuthResponse {
  token: string;
  user: UserDataResponse;
}

export interface DataResponse {
  data: AuthResponse; 
}