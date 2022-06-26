import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';

export const UserPage = () => {
    const { id } = useParams();
    const { user, error, loading } = useUser(id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>
                {user.name} {user.lastName}
            </h1>
        </div>
    );
};
