import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

interface GuestLoginResponse {
    message: string;
    token: string;
}


export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          setUserId(decodedToken.id);  // Assuming the token contains the `id` field
        } catch (error) {
          console.error('Error decoding token', error);
          setIsLoggedIn(false);
          setUserId(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserId(null);
      }
    }, []);
  
    return { isLoggedIn, userId };
  };

export const useGuestLogin = () => {
    const mutation = useMutation<GuestLoginResponse, Error, void>({
        mutationFn: async () => {
            const response = await axios.post('http://localhost:5000/auth/guest-login');
            console.log("logged in as guest");
            
            return response.data;
        }
    });

    return mutation;
};

export const useLogin = () => {
    const mutation = useMutation<LoginResponse, Error, LoginData>({
        mutationFn: async (loginData: LoginData) => {
            const response = await axios.post('http://localhost:5000/auth/login', loginData);
            return response.data;
        }
    });

    return mutation;
};

interface LogoutResponse {
    message: string;
}

export const useLogout = () => {
    const mutation = useMutation<LogoutResponse, Error, void>({
        mutationFn: async () => {
            const response = await axios.post('http://localhost:5000/auth/logout');
            return response.data;
        }
    });

    return mutation;
};