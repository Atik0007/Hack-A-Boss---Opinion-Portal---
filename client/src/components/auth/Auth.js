import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AutContext } from '../../utils/AuthContext';

export const Auth = () => {
    const { user, logout } = useContext(AutContext);
    return user ? (
        <p>
            user Conected {user.name}
            <button onClick={() => logout()}>Logout</button>
        </p>
    ) : (
        <ul>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );
};
