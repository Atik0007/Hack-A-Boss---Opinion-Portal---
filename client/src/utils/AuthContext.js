import { createContext, useEffect, useState } from 'react';
import { getMyData } from '../services';

export const AutContext = createContext(null);

export const AutProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState([]);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await getMyData({ token });
                setUser(data);
            } catch (err) {
                logout();
            }
        };

        if (token) {
            getUserData();
        }
    }, [token]);

    const login = (token) => {
        setToken(token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };
    return (
        <AutContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AutContext.Provider>
    );
};
