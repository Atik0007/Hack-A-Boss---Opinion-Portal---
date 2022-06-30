import './Profile.scss';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { AutContext } from '../../utils/AuthContext';
import { getMyData /* updateUser  */ } from '../../services';

import { useModal } from '../../utils/ModalContext';
import { EditEmail } from '../../components/editemail/EditEmail';
import { EditPassword } from '../../components/editPassword/EditPassword';

export const ProfilePage = () => {
    const [, setModal] = useModal();
    const { user } = useContext(AutContext);
    const { token } = useContext(AutContext);
    const [userData, setUserData] = useState(null);

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

    return (
        <div className="profile">
            {userData ? (
                <>
                    <div className="profileHeader">
                        <div className="profileHeaderAvatar">
                            {userData.image && (
                                <img
                                    src={require(`../../../../server/src/uploads/${userData.image}`)}
                                    alt="avatar"
                                />
                            )}
                        </div>
                        <h2>{userData.userName}</h2>
                    </div>
                    <div className="profileInfo">
                        <p>Name: {userData.name} </p>
                        <p>Last Name: {userData.lastName} </p>
                        <p>Gender: {userData.gender} </p>
                        <p>
                            Email:
                            <dev
                                className="editBtn"
                                onClick={() => setModal(<EditEmail />)}
                            >
                                <button className="editBtn">
                                    <span className="shadow"></span>
                                    <span className="edge"></span>
                                    <span className="front text">
                                        <AiOutlineEdit />
                                    </span>
                                </button>
                            </dev>
                        </p>
                        <p>
                            Password:
                            <dev
                                className="editBtn"
                                onClick={() => setModal(<EditPassword />)}
                            >
                                <button className="editBtn">
                                    <span className="shadow"></span>
                                    <span className="edge"></span>
                                    <span className="front text">
                                        <AiOutlineEdit />
                                    </span>
                                </button>
                            </dev>
                        </p>
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
