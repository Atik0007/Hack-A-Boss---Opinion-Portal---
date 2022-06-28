import './UserPage.scss';

import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';

export const UserPage = () => {
    const params = useParams();
    const { user, error, loading } = useUser(params.id);

    console.log(user);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>User not found</p>;

    return (
        <>
            <div className="profileHeader">
                <div className="profileHeaderAvatar">
                    <img src={user.image} alt="avatar" />
                </div>
                <h2>{user.userName}</h2>
            </div>
            <div className="profileInfo">
                <p>Name: {user.name} </p>
                <p>Last Name: {user.lastName} </p>
                <p>Gender: {user.gender} </p>
            </div>
        </>
    );
};
