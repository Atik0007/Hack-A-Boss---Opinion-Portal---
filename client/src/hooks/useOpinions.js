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

    const addOpinion = (opinion) => {
        loadOpinions(opinion);
    };

    const removeOpinion = (id) => {
        loadOpinions(id);
    };

    return { opinions, loading, error, addOpinion, removeOpinion };
};

export default useOpinions;
