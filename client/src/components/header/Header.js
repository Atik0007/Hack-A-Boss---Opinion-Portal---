import logo from './img/logo.svg';

import { FaBars, FaTimes } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { useContext, useState, useRef } from 'react';
import { AutContext } from '../../utils/AuthContext';
import './Header.scss';

/* import { Auth } from '../auth/Auth'; */

export const Header = () => {
    const { user, logout } = useContext(AutContext);

    const [burger, setBurger] = useState(false);

    const navRef = useRef();

    const handleClick = () => {
        navRef.current.classList.toggle('open');
        setBurger(!burger);
    };

    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <nav ref={navRef} className="navMenu">
                {user ? (
                    <>
                        <button className="button">
                            <button
                                className="button"
                                onClick={() => {
                                    setBurger(false);
                                    navRef.current.classList.toggle('open');
                                }}
                            >
                                <Link to="/new">
                                    <span className="shadow"></span>
                                    <span className="edge"></span>
                                    <span className="front text">+</span>
                                </Link>
                            </button>
                        </button>
                        <button className="button">
                            <button
                                className="button"
                                onClick={() => {
                                    setBurger(false);
                                    navRef.current.classList.toggle('open');
                                    logout();
                                }}
                            >
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front text">Logout</span>
                            </button>
                        </button>
                    </>
                ) : (
                    <button className="button">
                        <button
                            className="button"
                            onClick={() => {
                                setBurger(false);
                                navRef.current.classList.toggle('open');
                            }}
                        >
                            <Link to="/login">
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front text">Login</span>
                            </Link>
                        </button>
                    </button>
                )}
            </nav>
            <>
                <button className="btn button" onClick={handleClick}>
                    {burger ? (
                        <button className="button">
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">
                                <FaTimes />
                            </span>
                        </button>
                    ) : (
                        <button className="button">
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front text">
                                <FaBars />
                            </span>
                        </button>
                    )}
                </button>
            </>
        </header>
    );
};
