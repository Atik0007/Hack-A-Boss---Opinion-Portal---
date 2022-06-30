import { useEffect, useState } from 'react';

import { getAllOpinions } from '../services';
const useOpinions = () => {
    const [opinions, setOpinions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
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
    };
};

export default useOpinions;
