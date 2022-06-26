import useOpinions from '../../hooks/useOpinions';
import { OpinionList } from '../../components/opinionList/OpinionList';
/* import { useContext } from 'react';
import { AutContext } from '../context/AuthContext';
import { NewOpinion } from '../components/NewOpinion'; */

export const HomePage = () => {
    const { opinions, loading, error, /* addOpinion, */ removeOpinion } =
        useOpinions();
    /*  const { user } = useContext(AutContext); */

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section>
            <h1>Last Opinion</h1>

            {/* {user ? <NewOpinion addOpinion={addOpinion} /> : null} */}

            <OpinionList opinions={opinions} removeOpinion={removeOpinion} />
        </section>
    );
};