import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => {
    return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null);

    return (
        <ModalContext.Provider value={[modal, setModal]}>
            {children}
        </ModalContext.Provider>
    );
};
