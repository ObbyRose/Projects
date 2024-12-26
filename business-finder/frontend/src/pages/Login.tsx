import React from 'react';
import { LoginForm } from '../components/login-form.tsx';

const Login: React.FC = () => {
    return (
        <div className="flex items-center justify-center m-auto">
            <LoginForm />
        </div>
    );
};

export default Login;