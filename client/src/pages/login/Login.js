import './Login.scss';

import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { loginUser } from '../../services';
import { AutContext } from '../../utils/AuthContext';

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);

    const { login } = useContext(AutContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setStatus('Loading');

        try {
            const data = await loginUser(email, password);

            if (data.status === 'Error') {
                setStatus(data.message);
            } else {
                login(data);
                setStatus('Loaded');
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            setStatus(err.message);
        }
    };
    return (
        <section className="loginSection">
            <form className="login" onSubmit={handleLogin}>
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
                <dev className="button">
                    <button className="button">
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front text">
                            {' '}
                            {status === 'Loading' ? 'Loading...' : 'Login'}
                        </span>
                    </button>
                </dev>

                {status && <p className="error">{status}</p>}

                {status === 'Loaded' && <p>You have successfully logged in.</p>}
            </form>

            <div className="register">
                <p>Join the community</p>

                <dev className="button">
                    <Link to="/register">
                        <button className="button">
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">
                                Create new account
                            </span>
                        </button>
                    </Link>
                </dev>
            </div>
        </section>
    );
};
