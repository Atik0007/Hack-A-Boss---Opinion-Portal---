import './Opinion.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AutContext } from '../../utils/AuthContext';
import { deleteMyOpinion, addLike, disLike } from '../../services';

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

    const addLikeToOpinion = async (id) => {
        try {
            await addLike({ token, id });
            removeOpinion(id);
        } catch (err) {
            setError(err.message);
        }
    };

    const disLikeToOpinion = async (id) => {
        try {
            await disLike({ token, id });
            removeOpinion(id);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <article>
            <Link to={`/user/${opinion.idUser}`}>
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

                    <Link to={`/edit/${opinion.id}`}>
                        <button>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">Edit</span>
                        </button>
                    </Link>
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}

            <footer>
                <button onClick={() => addLikeToOpinion(opinion.id)}>
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front text">Like</span>
                </button>
                <p>{opinion.likes}</p>
                <button onClick={() => disLikeToOpinion(opinion.id)}>
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front text">Dislike</span>
                </button>
                <p>{opinion.dislikes}</p>
                <time>{new Date(opinion.createdAt).toLocaleString()}</time>
            </footer>
        </article>
    );
};
