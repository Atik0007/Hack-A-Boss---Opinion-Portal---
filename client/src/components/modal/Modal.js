import './Modal.scss';

import { useModal } from '../../utils/ModalContext';

const Modal = ({ children }) => {
    const [, setModal] = useModal();

    return (
        <div className="modalBg" onClick={() => setModal(null)}>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
    );
};

export default Modal;
