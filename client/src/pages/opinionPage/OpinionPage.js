import './OpinionPage.scss';

import { useParams } from 'react-router-dom';

import { Opinion } from '../../components/opinion/Opinion';
import { useOpinion } from '../../hooks/useOpinion';

export const OpinionPage = () => {
    const { id } = useParams();

    const { opinion, loading, error } = useOpinion(id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="opinion">
            <Opinion opinion={opinion.opinion} />
        </section>
    );
};
