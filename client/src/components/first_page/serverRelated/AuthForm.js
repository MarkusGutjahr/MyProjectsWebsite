import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAuth = async (action) => {
        try {
            let response;
            if (action === 'register') {
                response = await axios.post('/register', { username, password });
                console.log('Registration successful:', response.data);

                const { token } = response.data;
                localStorage.setItem('token', token);
                onLogin(username, password);
            } else if (action === 'login') {
                response = await axios.post('/login', { username, password });
                const { token } = response.data;
                localStorage.setItem('token', token);
                onLogin();
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="auth-form-container">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div className="button-container">
                <button type="button" onClick={() => handleAuth('login')}>Login</button>
                <button type="button" onClick={() => handleAuth('register')}>Register</button>
            </div>
            {error && <div>{error}</div>}
        </div>
    );
};

export default AuthForm;
