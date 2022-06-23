import useFetch from '../../hooks/useFetch';
import { useToken } from '../../utils/TokenContext';

const Profile = () => {
    const { data, status } = useFetch('http://localhost:4000/user');

    const [, setToken] = useToken();

    if (status === 'Loading') return <p>Loading...</p>;

    const handleLogout = async (e) => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <div className="userInfo">
            <p>{data?.user.name}</p>

            <button variant="primary" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Profile;
