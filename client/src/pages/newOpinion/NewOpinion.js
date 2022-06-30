import './NewOpinion.scss';

import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { createOpinion } from '../../services';
import { AutContext } from '../../utils/AuthContext';

export const NewOpinion = () => {
    const navigate = useNavigate();

    const [sending, setSending] = useState(false);
    const { token } = useContext(AutContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSending(true);

            await createOpinion({ token, text, title });

            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setSending(false);
        }
    };

    if (!token) return <Navigate to="/" />;
    return (
        <section className="createOpinion">
            <form className="opinionForm" onSubmit={handleSubmit}>
                <h1>Create Opinion</h1>
                <input
                    placeholder="Title"
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Write your opinion"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <dev className="button">
                    <button className="button">
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front text">
                            {sending ? 'Loading...' : 'Create Opinion'}
                        </span>
                    </button>
                </dev>

                {sending ? <p>Sending...</p> : null}
            </form>
            {error ? <p>{error}</p> : null}
        </section>
    );
};
