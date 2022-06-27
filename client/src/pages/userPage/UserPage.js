import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';

export const UserPage = () => {
    const params = useParams();
    const { user, error, loading } = useUser(params.id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>User not found</p>;

    return (
        <section className="user-page">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.opinion}</p>
        </section>
    );
};
