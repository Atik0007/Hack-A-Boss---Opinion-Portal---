import { useState, useEffect } from 'react';
import { useToken } from '../utils/TokenContext';

const useFetch = (url) => {
    const [token] = useToken();
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('Loading');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // If there is no token, return object null, and if there is a token, add it to the header
                const params = !token
                    ? {}
                    : {
                          headers: {
                              Authorization: token,
                          },
                      };

                setStatus('Loading');

                const response = await fetch(url, params);

                if (!response.ok) throw new Error(response.statusText);

                const { data } = await response.json();

                setData(data);

                setStatus('Loaded');
            } catch (err) {
                setStatus('Error');
            }
        };
        fetchData();
    }, [url, token]);

    return {
        data,
        status,
    };
};

export default useFetch;
