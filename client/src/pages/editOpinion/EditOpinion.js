import { useContext, useState } from 'react';
import { AutContext } from '../../utils/AuthContext';
import { updateMyOpinion } from '../../services';

export const EditOpinion = ({ opinion }) => {
    const { user, token } = useContext(AutContext);
    const [error, setError] = useState('');
    const updateOpinion = async (id, text) => {
        try {
            await updateMyOpinion({ token, id, text });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <article>
            <p>
                {opinion.name} {opinion.lastName}
            </p>

            <p className="text">{opinion.text}</p>
            {user && user.id === opinion.idUser ? (
                <section>
                    <button
                        onClick={() => updateOpinion(opinion.id, opinion.text)}
                    >
                        Edit
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
