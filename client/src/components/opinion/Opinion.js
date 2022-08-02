import './Opinion.scss';

import { format } from 'date-fns';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { AiOutlineEdit, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import { AutContext } from '../../utils/AuthContext';
import { deleteMyOpinion, addLike, disLike } from '../../services';

export const Opinion = ({ opinion, removeOpinion }) => {
    const dateTime = format(new Date(opinion.createdAt), 'yyyy-MM-dd');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState(opinion.likes);
    const [dislike, setDislike] = useState(opinion.dislikes);

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
        setLoading(true);
        try {
            const data = await addLike({ token, id });

            if (data.message === 'Like inserted') {
                setLikes(likes + 1);
            } else if (data.message === 'Like deleted') {
                setLikes(likes - 1);
            } else {
                setLikes(likes + 1);
                setDislike(dislike - 1);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const disLikeBtn = async (id) => {
        setLoading(true);
        try {
            const data = await disLike({ token, id });

            if (data.message === 'Dislike inserted') {
                setDislike(dislike + 1);
            } else if (data.message === 'Dislike deleted') {
                setDislike(dislike - 1);
            } else {
                setLikes(likes - 1);
                setDislike(dislike + 1);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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
                        <dev className="deleteBtn">
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
                        </dev>
                        <dev className="editBtn">
                            <Link to={`/edit/${opinion.id}`}>
                                <button className="editBtn">
                                    <span className="shadow"></span>
                                    <span className="edge"></span>
                                    <span className="front text">
                                        <AiOutlineEdit />
                                    </span>
                                </button>
                            </Link>
                        </dev>
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
                    <dev className="likeBtn">
                        <button
                            disabled={loading}
                            className="likeBtn"
                            onClick={() => addLikeBtn(opinion.id)}
                        >
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">
                                <AiFillLike />
                            </span>
                        </button>
                    </dev>
                    <p>{likes}</p>
                    <dev className="dislikeBtn">
                        <button
                            disabled={loading}
                            className="dislikeBtn"
                            onClick={() => disLikeBtn(opinion.id)}
                        >
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">
                                <AiFillDislike />
                            </span>
                        </button>
                    </dev>
                    <p>{dislike}</p>
                </section>
                <time className="time" dateTime={dateTime}>
                    {format(new Date(opinion.createdAt), 'hh:mm - dd/MM/yyyy')}
                </time>
            </footer>
        </article>
    );
};
