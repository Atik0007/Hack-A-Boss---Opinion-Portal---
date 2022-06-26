import { useEffect, useState } from 'react';
import { getOpinion } from '../services';

export const useOpinion = (id) => {
    const [opinion, setOpinion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadOpinion = async () => {
            try {
                setLoading(true);

                const data = await getOpinion(id);

                setOpinion(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadOpinion();
    }, [id]);

    return { opinion, loading, error };
};
