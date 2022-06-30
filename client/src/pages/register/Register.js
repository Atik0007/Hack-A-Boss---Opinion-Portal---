import './Register.scss';

import { useState } from 'react';
import { registerUser } from '../../services';
import { useNavigate } from 'react-router-dom';
export const Register = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        setError('');

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            const data = await registerUser(
                name,
                lastName,
                email,
                password,
                userName,
                gender,
                selectedFile
            );

            if (data.status === 'Error') {
                setError(data.message);
            } else {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };
    console.log(selectedFile);

    return (
        <section className="registerSection">
            <form className="register" onSubmit={handleRegister}>
                <input
                    type="text"
                    id="userName"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    required
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    required
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    required
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    required
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    required
                    type="password"
                    id="passwordConfirm"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />

                <select
                    required
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="none" selected>
                        Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                    }}
                />
                <dev className="button">
                    <button className="button">
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front text">Register</span>
                    </button>
                </dev>
                {error ? <p>{error}</p> : null}
            </form>
        </section>
    );
};
