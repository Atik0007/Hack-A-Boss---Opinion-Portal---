import './Register.scss';

import { useState } from 'react';
import { registerUser } from '../../services';
import { useNavigate } from 'react-router-dom';
export const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        setError('');

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            const data = await registerUser(name, lastName, email, password);

            if (data.status === 'Error') {
                setError(data.message);
            } else {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <section className="registerSection">
            <form className="register" onClick={handleRegister}>
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    id="passwordConfirm"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />

                <button>
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front text">Register</span>
                </button>
                {error ? <p>{error}</p> : null}
            </form>
        </section>
    );
};
