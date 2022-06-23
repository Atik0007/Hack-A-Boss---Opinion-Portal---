import { useState } from 'react';
import { useModal } from '../../utils/ModalContext';

import style from './Register.module.scss';

const Register = () => {
    const [, setModal] = useModal();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    email,
                    password,
                }),
            });

            const body = await response.json();

            if (body.status === 'Error') {
                setError(body.message);
            } else {
                setMessage(body.message);
                setModal(null);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <form className={style.register} onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                {error && <p className={style.error}>{error}</p>}
                {message && <p>{message}</p>}
            </form>
        </main>
    );
};

export default Register;
