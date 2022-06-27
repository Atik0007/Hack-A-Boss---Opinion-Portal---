import { useContext, useEffect, useState } from 'react';
import { AutContext } from '../../utils/AuthContext';
import { getMyData, updateUser } from '../../services';

export const ProfilePage = () => {
    const { user, logout } = useContext(AutContext);
    const { token } = useContext(AutContext);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await getMyData({ token });
                setUserData(data);
            } catch (err) {
                console.log(err);
            }
        };
        loadUserData();
    }, [user]);

    const updateUserDataForm = async () => {
        try {
            await updateUser({ token, email, password });
            logout();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            <p>
                {userData && userData.name} {userData && userData.lastName}
            </p>
            <p>{userData && userData.email}</p>
            <button onClick={() => logout()}>Logout</button>
            <form>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button onClick={updateUserDataForm}>Update</button>
            </form>
        </div>
    );
};
