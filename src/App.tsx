import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login/Login';
import Home from './pages/Home/Home';
import Register from './components/auth/Register/Register';
import FullPostPage from './pages/FullPostPage/FullPostPage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';
import { getLocalStorage } from './utils/serviceLocalStorage';
import { useAppDispatch } from './redux/store';
import { authorization } from './redux/slices/auth/auth';
import { useEffect } from 'react';

function App() {
    const dispatch = useAppDispatch();

    const isAuthExist = (): void => {
        const user = getLocalStorage('user');
        if (user) {
            dispatch(authorization(user));
        }
    };

    useEffect(() => {
        isAuthExist();
    }, []);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/posts/:id' element={<FullPostPage />} />
            <Route path='/posts/create' element={<CreatePostPage />} />
            <Route path='/posts/:id/edit' element={<EditPostPage />} />
        </Routes>
    );
}

export default App;
