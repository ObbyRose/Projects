import React from 'react';
import { SignUpForm } from '../components/sign-up-form.tsx';

const Signup: React.FC = () => {
    return (
        <div className='flex items-center flex-col justify-center m-auto'>
            <SignUpForm />
        </div>
    );
};

export default Signup;