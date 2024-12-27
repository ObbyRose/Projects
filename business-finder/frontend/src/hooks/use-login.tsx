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

export const useGuestLogin = () => {
    const mutation = useMutation<GuestLoginResponse, Error, void>({
        mutationFn: async () => {
            const response = await axios.post('http://localhost:5000/auth/guest-login');
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
