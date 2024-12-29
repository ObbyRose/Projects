import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return isLoggedIn;
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