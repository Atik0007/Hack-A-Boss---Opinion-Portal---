import './Opinion.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AutContext } from '../../utils/AuthContext';
import { deleteMyOpinion } from '../../services';

export const Opinion = ({ opinion, removeOpinion }) => {
    const navigate = useNavigate();

    const { user, token } = useContext(AutContext);
    const [error, setError] = useState('');
    const deleteOpinion = async (id) => {
        try {
            await deleteMyOpinion({ token, id });
            if (removeOpinion) {
                removeOpinion(id);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <article>
            <Link to={`/opinion/${opinion.id}`}>
                <p>
                    {opinion.name} {opinion.lastName}
                </p>
            </Link>
            <p className="text">{opinion.text}</p>
            {user && user.id === opinion.idUser ? (
                <section>
                    <button onClick={() => deleteOpinion(opinion.id)}>
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front text">Delete</span>
                    </button>
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}

            <footer>
                <time>{new Date(opinion.createdAt).toLocaleString()}</time>
            </footer>
        </article>
    );
};
