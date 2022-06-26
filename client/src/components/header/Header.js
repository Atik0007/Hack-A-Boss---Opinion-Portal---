import logo from './img/logo.svg';

/* import { FaBars, FaTimes } from 'react-icons/fa'; */

import { Link } from 'react-router-dom';
import { useContext /* useState, useRef */ } from 'react';
import { AutContext } from '../../utils/AuthContext';
import './Header.scss';

/* import { Auth } from '../auth/Auth'; */

export const Header = () => {
    const { user, logout } = useContext(AutContext);

    /* const [burger, setBurger] = useState(false);
    const navRef = useRef(); */

    /*  const handleClick = () => {
        navRef.current.classList.toggle('open');
        setBurger(!burger);
    }; */
    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <nav className="navMenu">
                {user ? (
                    <>
                        <button onClick={() => logout()}>
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">Logout</span>
                        </button>
                        <button>
                            <Link to="/new">
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front text">+</span>
                            </Link>
                        </button>
                    </>
                ) : (
                    <button>
                        <Link to="/login">
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">Login</span>
                        </Link>
                    </button>
                )}
            </nav>
        </header>
    );
};
