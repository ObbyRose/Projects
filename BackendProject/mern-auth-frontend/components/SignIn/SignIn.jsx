import React, { useState } from 'react';
import api from '../../api.js';
import {Link} from 'react-router-dom'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

    if (!email || !password) {
        setError('Please fill in all fields');
        return;
    }

    try {
        const response = await api.post('/signin', { email, password });
        setSuccess('Login successful');
        localStorage.setItem('token', response.data.token);
    } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
        <button type="submit">Sign In</button>
        <p>Don't have an account? <Link to='/signup'> Sign Up </Link></p>
        </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default SignIn;
