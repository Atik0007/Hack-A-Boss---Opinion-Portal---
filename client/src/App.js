import { Routes, Route } from 'react-router-dom';

import Modal from './components/modal/Modal';
import { useModal } from './utils/ModalContext';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { NewOpinion } from './pages/newOpinion/NewOpinion';

import { HomePage } from './pages/homePage/HomePage';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { OpinionPage } from './pages/opinionPage/OpinionPage';

import { EditOpinion } from './pages/editOpinion/EditOpinion';
import { ProfilePage } from './pages/profile/Profile';

function App() {
    const [modal] = useModal();
    return (
        <main className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/opinion/:id" element={<OpinionPage />} />
                <Route path="/new" element={<NewOpinion />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/edit/:id" element={<EditOpinion />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
            {modal && <Modal>{modal}</Modal>}

            <Footer />
        </main>
    );
}

export default App;
