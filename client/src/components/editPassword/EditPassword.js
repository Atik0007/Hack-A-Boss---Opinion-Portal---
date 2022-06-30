import './EditPassword.scss';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateUser } from '../../services/index';
import { AutContext } from '../../utils/AuthContext';
import { useModal } from '../../utils/ModalContext';

export const EditPassword = () => {
    const navigate = useNavigate();
    const { token } = useContext(AutContext);
    const [, setModal] = useModal();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const updateUserDataForm = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirm) {
            setError('Email does not match');
            return;
        }
        try {
            await updateUser({ token, password });

            navigate('/profile');
            setModal(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="editPassword">
            <form className="editPasswordForm" onSubmit={updateUserDataForm}>
                <h1>Edit Password</h1>
                <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    placeholder="Confirm Password"
                    type="password"
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <div className="button">
                    <button className="button">
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front text">update</span>
                    </button>
                </div>
            </form>
            {error ? <p className="error">{error}</p> : null}
        </section>
    );
};
