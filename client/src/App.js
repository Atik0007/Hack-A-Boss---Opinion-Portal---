import './App.css';

/* import { Routes, Route } from 'react-router-dom'; */

import Header from './components/header/Header';
import Modal from './components/modal/Modal';
import { useModal } from './utils/ModalContext';

function App() {
    const [modal] = useModal();
    return (
        <div className="App">
            <Header />
            {/* <Routes>
                <Route path="/" element={<Login />} />
            </Routes> */}
            {modal && <Modal>{modal}</Modal>}
        </div>
    );
}

export default App;
