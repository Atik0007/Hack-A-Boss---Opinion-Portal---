import './Opinion.scss';
import { format } from 'date-fns';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AiOutlineEdit, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AutContext } from '../../utils/AuthContext';
import { deleteMyOpinion, addLike, disLike } from '../../services';

export const Opinion = ({ opinion, removeOpinion }) => {
    const navigate = useNavigate();

    const dateTime = format(new Date(opinion.createdAt), 'yyyy-MM-dd');

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
        <article className="blogPost">
            <div className="blogHeader">
                {opinion.image && (
                    <div className="imgPod">
                        <img
                            src={`http://localhost:4000/${opinion.image}`}
                            alt="avatar"
                        />
                    </div>
                )}
                <Link to={`/user/${opinion.idUser}`}>
                    <h3>
                        {opinion.name} {opinion.lastName}
                    </h3>
                </Link>
            </div>
            <div className="containerBody">
                <time dateTime={dateTime}>
                    {format(new Date(opinion.createdAt), 'hh:mm - dd/MM/yyyy')}
                </time>
                <h2>CSS Positioning</h2>
                <p className="text">{opinion.text}</p>
            </div>

            <footer>
                <section className="leftSide">
                    <button className="likeBtn">
                        <button
                            className="likeBtn"
                            onClick={() => addLikeToOpinion(opinion.id)}
                        >
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">
                                <AiFillLike />
                            </span>
                        </button>
                    </button>
                    <p>{opinion.likes}</p>
                    <button className="dislikeBtn">
                        <button
                            className="dislikeBtn"
                            onClick={() => disLikeToOpinion(opinion.id)}
                        >
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">
                                <AiFillDislike />
                            </span>
                        </button>
                    </button>
                    <p>{opinion.dislikes}</p>
                </section>
                {user && user.id === opinion.idUser ? (
                    <section className="rightSide">
                        <button className="deleteBtn">
                            <button
                                className="deleteBtn"
                                onClick={() => deleteOpinion(opinion.id)}
                            >
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front text">
                                    <RiDeleteBin5Fill />
                                </span>
                            </button>
                        </button>
                        <button className="editBtn">
                            <Link to={`/edit/${opinion.id}`}>
                                <button className="editBtn">
                                    <span className="shadow"></span>
                                    <span className="edge"></span>
                                    <span className="front text">
                                        <AiOutlineEdit />
                                    </span>
                                </button>
                            </Link>
                        </button>
                        {error ? <p>{error}</p> : null}
                    </section>
                ) : null}
            </footer>
        </article>
    );
};
