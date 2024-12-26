import React from 'react';
import { SignUpForm } from '../components/sign-up-form.tsx';

const Signup: React.FC = () => {
    return (
        <div className='flex items-center flex-col justify-center m-auto'>
            <h1 className='text-purpleCustom mb-6 text-2xl'>SignUp to Connect</h1>
            <SignUpForm />
        </div>
    );
};

export default Signup;