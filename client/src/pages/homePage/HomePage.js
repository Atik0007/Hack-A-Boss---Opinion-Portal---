import useOpinions from '../../hooks/useOpinions';
import { OpinionList } from '../../components/opinionList/OpinionList';

export const HomePage = () => {
    const { opinions, loading, error, removeOpinion } = useOpinions();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="homePage">
            <OpinionList opinions={opinions} removeOpinion={removeOpinion} />
        </section>
    );
};
