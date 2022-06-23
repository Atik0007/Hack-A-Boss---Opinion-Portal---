import { createContext, useContext, useState } from 'react';

const TokenContext = createContext(null);

export const useToken = () => {
    return useContext(TokenContext);
};

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const setTokenInLocalStorage = (newToken) => {
        if (!newToken) {
            localStorage.removeItem('token', newToken);
        } else {
            localStorage.setItem('token', newToken);
        }

        setToken(newToken);
    };

    return (
        <TokenContext.Provider value={[token, setTokenInLocalStorage]}>
            {children}
        </TokenContext.Provider>
    );
};
