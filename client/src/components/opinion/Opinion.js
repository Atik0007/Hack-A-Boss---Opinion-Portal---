import './Opinion.scss';

import { format } from 'date-fns';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { AiOutlineEdit, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import { AutContext } from '../../utils/AuthContext';
import { deleteMyOpinion, addLike, disLike } from '../../services';

export const Opinion = ({ opinion, removeOpinion, loadOpinions }) => {
    const dateTime = format(new Date(opinion.createdAt), 'yyyy-MM-dd');
    const navigate = useNavigate();

    const { user, token } = useContext(AutContext);

    const [error, setError] = useState('');
    const deleteOpinion = async (id) => {
        try {
            await deleteMyOpinion({ token, id });

            navigate('/');
            removeOpinion(id);
        } catch (err) {
            setError(err.message);
        }
    };

    const addLikeBtn = async (id) => {
        try {
            await addLike({ token, id });

            loadOpinions();
        } catch (err) {
            setError(err.message);
        }
    };

    const disLikeBtn = async (id) => {
        try {
            await disLike({ token, id });

            loadOpinions();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <article className="blogPost">
            <div className="blogHeader">
                <div className="headerRight">
                    {opinion.image && (
                        <div className="imgPod">
                            <img
                                src={require(`../../../../server/src/uploads/${opinion.image}`)}
                                alt="avatar"
                            />
                        </div>
                    )}

                    <h3>{opinion.userName}</h3>
                </div>

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
            </div>
            <div className="containerBody">
                <Link to={`/opinion/${opinion.id}`}>
                    <h2>{opinion.title}</h2>
                </Link>
                <p className="text">{opinion.text}</p>
            </div>

            <footer>
                <section className="leftSide">
                    <button className="likeBtn">
                        <button
                            className="likeBtn"
                            onClick={() => addLikeBtn(opinion.id)}
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
                            onClick={() => disLikeBtn(opinion.id)}
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
                <time className="time" dateTime={dateTime}>
                    {format(new Date(opinion.createdAt), 'hh:mm - dd/MM/yyyy')}
                </time>
            </footer>
        </article>
    );
};
