import { Routes, Route } from 'react-router-dom';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { NewOpinion } from './pages/newOpinion/NewOpinion';

import { HomePage } from './pages/homePage/HomePage';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { OpinionPage } from './pages/opinionPage/OpinionPage';
import { UserPage } from './pages/userPage/UserPage';

import { EditOpinion } from './pages/editOpinion/EditOpinion';
import { ProfilePage } from './pages/profile/Profile';

function App() {
    return (
        <main className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/opinion/:id" element={<OpinionPage />} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/new" element={<NewOpinion />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/edit/:id" element={<EditOpinion />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer />
        </main>
    );
}

export default App;
