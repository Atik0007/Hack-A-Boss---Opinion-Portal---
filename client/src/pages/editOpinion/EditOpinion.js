import { useState, useContext } from 'react';
import { updateMyOpinion } from '../../services';
import { AutContext } from '../../utils/AuthContext';
import { useNavigate, Navigate, useParams } from 'react-router-dom';

export const EditOpinion = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { token } = useContext(AutContext);
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMyOpinion({ token, id: params.id, text });
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    if (!token) return <Navigate to="/" />;
    return (
        <section className="create-opinion">
            <form className="opinion-form" onSubmit={handleSubmit}>
                <h1>Edit Opinion</h1>
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
