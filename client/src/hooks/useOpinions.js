import { useEffect, useState } from 'react';
import { getAllOpinions } from '../services';
const useOpinions = () => {
    const [opinions, setOpinions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loadOpinions = async () => {
        try {
            setLoading(true);

            const data = await getAllOpinions();

            setOpinions(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOpinions();
    }, []);

    const removeOpinion = (id) => {
        setOpinions(opinions.filter((opinion) => opinion.id !== id));
    };

    return {
        opinions,
        loading,
        error,
        removeOpinion,
        setOpinions,
        loadOpinions,
        setLoading,
    };
};

export default useOpinions;
