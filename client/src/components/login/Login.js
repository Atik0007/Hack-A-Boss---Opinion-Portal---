import { useState } from 'react';
import { useToken } from '../../utils/TokenContext';
import { useModal } from '../../utils/ModalContext';

import Register from '../register/Register';

import style from './Login.module.scss';

const Login = () => {
    const [, setToken] = useToken();
    const [, setModal] = useModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus('Loading');

        try {
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const body = await response.json();

            if (body.status === 'Error') {
                setStatus(body.message);
            } else {
                setToken(body.data.token);
                setModal(null);
                setStatus('Loaded');
            }
        } catch (err) {
            console.error(err);
            setStatus(err.message);
        }
    };

    return (
        <main>
            <form className={style.login} onSubmit={handleSubmit}>
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
                <button disabled={status === 'Loading'}>
                    {status === 'Loading' ? 'Loading...' : 'Login'}
                </button>

                {status && <p className={style.error}>{status}</p>}

                {status === 'Loaded' && <p>You have successfully logged in.</p>}
            </form>

            <div className={style.register}>
                <p>Join the community</p>
                <button
                    className={style.button}
                    /* onClick={() => setModal(<Register />)} */
                >
                    Create new account
                </button>
            </div>
        </main>
    );
};

export default Login;
