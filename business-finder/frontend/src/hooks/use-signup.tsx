import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface SignUpData {
    email: string;
    password: string;
    name: string;
}

interface SignUpResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const useSignUp = () => {
    const mutation = useMutation<SignUpResponse, Error, SignUpData>({
        mutationFn: async (signUpData: SignUpData) => {
            const response = await axios.post('http://localhost:5000/auth/signup', signUpData);
            return response.data;
        }
    });

    return mutation;
};