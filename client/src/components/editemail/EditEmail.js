import './EditEmail.scss';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateUser } from '../../services/index';
import { AutContext } from '../../utils/AuthContext';
import { useModal } from '../../utils/ModalContext';

export const EditEmail = () => {
    const navigate = useNavigate();
    const { token } = useContext(AutContext);
    const [, setModal] = useModal();

    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const updateUserDataForm = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (email !== emailConfirm) {
            setError('Email does not match');
            setLoading(false);
            return;
        }

        try {
            await updateUser({ token, email });

            navigate('/profile');
            setModal(null);
        } catch (err) {
            setError(err.message);

            setLoading(false);
        }
    };

    return (
        <section className="editEmail">
            <form className="editEmailForm" onSubmit={updateUserDataForm}>
                <h1>Edit Email</h1>
                <input
                    placeholder="Email"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Confirm Email"
                    type="text"
                    id="emailConfirm"
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
                />

                {loading ? (
                    <dev className="button">
                        <button className="button">
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">loading</span>
                        </button>
                    </dev>
                ) : (
                    <dev className="button">
                        <button className="button">
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">update</span>
                        </button>
                    </dev>
                )}
            </form>
            {error ? <p className="error">{error}</p> : null}
        </section>
    );
};
