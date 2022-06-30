import './EditOpinion.scss';

import { useState, useContext } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';

import { updateMyOpinion } from '../../services';
import { AutContext } from '../../utils/AuthContext';

export const EditOpinion = () => {
    const params = useParams();

    const navigate = useNavigate();

    const { token } = useContext(AutContext);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMyOpinion({ token, id: params.id, text, title });
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    if (!token) return <Navigate to="/" />;
    return (
        <section className="createOpinion">
            <form className="opinionForm" onSubmit={handleSubmit}>
                <h1>Edit Opinion</h1>

                <input
                    placeholder="Title"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Write your opinion"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button className="button">
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front text">update</span>
                </button>
            </form>
            {error ? <p>{error}</p> : null}
        </section>
    );
};
