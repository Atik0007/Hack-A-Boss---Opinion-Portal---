import './Profile.scss';
import { useContext, useEffect, useState } from 'react';
import { AutContext } from '../../utils/AuthContext';
import { getMyData /* updateUser  */ } from '../../services';

export const ProfilePage = () => {
    const { user /* logout  */ } = useContext(AutContext);
    const { token } = useContext(AutContext);
    const [userData, setUserData] = useState(null);
    /*     const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); */

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    /* const updateUserDataForm = async () => {
        try {
            await updateUser({ token, email, password });
            logout();
        } catch (err) {
            console.log(err);
        }
    }; */

    console.log(userData);

    return (
        <div className="profile">
            {userData ? (
                <>
                    <div className="profileHeader">
                        <div className="profileHeaderAvatar">
                            <img src={userData.image} alt="avatar" />
                        </div>
                        <h2>{userData.userName}</h2>
                    </div>
                    <div className="profileInfo">
                        <p>Name: {userData.name} </p>
                        <p>Last Name: {userData.lastName} </p>
                        <p>Gender: {userData.gender} </p>
                    </div>
                </>
            ) : (
                <div className="profileLoading">
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
    );
};
