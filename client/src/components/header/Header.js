import logo from './img/logo.svg';
/* import { NavLink } from 'react-router-dom'; */

import Login from '../login/Login';
import Profile from '../profile/Profile';

import { useToken } from '../../utils/TokenContext';
import { useModal } from '../../utils/ModalContext';

import style from './Header.module.scss';

const Header = () => {
    const [token] = useToken();
    const [, setModal] = useModal();

    return (
        <div className={style.header}>
            <div className={style.header__content}>
                <img src={logo} alt="logo" />
                {!token && (
                    <div className={style.header__login}>
                        <div
                            className={style.button}
                            onClick={() => setModal(<Login />)}
                        >
                            <span>Login</span>
                        </div>
                    </div>
                )}
                {token && <Profile />}
            </div>
        </div>
    );
};

export default Header;
