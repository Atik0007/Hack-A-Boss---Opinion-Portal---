import './Header.scss';

import { Link } from 'react-router-dom';
import { useContext, useState, useRef } from 'react';

import Logo from './img/logo.svg';
import { FaBars, FaTimes } from 'react-icons/fa';

import { AutContext } from '../../utils/AuthContext';

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
                <img src={Logo} alt="logo" />
            </Link>
            <nav ref={navRef} className="navMenu">
                {user ? (
                    <>
                        <dev className="button">
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
                        </dev>
                        <dev className="button">
                            <button
                                className="button"
                                onClick={() => {
                                    setBurger(false);
                                    navRef.current.classList.toggle('open');
                                }}
                            >
                                <Link to="/profile">
                                    <span className="shadow"></span>
                                    <span className="edge"></span>
                                    <span className="front text">🧑‍💻</span>
                                </Link>
                            </button>
                        </dev>
                        <dev className="button">
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
                        </dev>
                    </>
                ) : (
                    <dev className="button">
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
                    </dev>
                )}
            </nav>
            <>
                <dev className="btn button" onClick={handleClick}>
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
                </dev>
            </>
        </header>
    );
};
