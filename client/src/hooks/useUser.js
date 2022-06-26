import { useState, useEffect } from 'react';
import { getUser } from '../services';
const useUser = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);

                const data = await getUser({ id });

                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [id]);

    return { user, error, loading };
};

export default useUser;
