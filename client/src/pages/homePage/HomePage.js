import useOpinions from '../../hooks/useOpinions';
import { OpinionList } from '../../components/opinionList/OpinionList';

export const HomePage = () => {
    const {
        opinions,
        loading,
        error,
        removeOpinion,
        setOpinions,
        loadOpinions,
        setLoading,
    } = useOpinions();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="homePage">
            <OpinionList
                opinions={opinions}
                removeOpinion={removeOpinion}
                setOpinions={setOpinions}
                loadOpinions={loadOpinions}
                setLoading={setLoading}
            />
        </section>
    );
};
