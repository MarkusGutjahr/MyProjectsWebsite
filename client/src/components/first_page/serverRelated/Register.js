import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from "bcryptjs";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Send the username and hashed password to the server
            const response = await axios.post('/register', { username, password: password });

            // Handle successful registration
            console.log('Registration successful:', response.data);
        } catch (error) {
            // Handle registration error
            console.error('Registration error:', error.response.data.message);
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default Register;
