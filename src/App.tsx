import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login/Login';
import Home from './pages/Home/Home';
import Register from './components/auth/Register/Register';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    );
}

export default App;
