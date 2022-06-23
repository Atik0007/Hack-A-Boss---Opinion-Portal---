import { useModal } from '../../utils/ModalContext';

import style from './Modal.module.scss';

const Modal = ({ children }) => {
    const [, setModal] = useModal();

    return (
        <div className={style.modalBg} onClick={() => setModal(null)}>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
    );
};

export default Modal;
