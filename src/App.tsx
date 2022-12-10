import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import FullPostPage from './pages/FullPostPage/FullPostPage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';
import { getLocalStorage } from './utils/serviceLocalStorage';
import { useAppDispatch } from './redux/store';
import { authorization } from './redux/slices/auth/auth';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import PostsPage from './pages/PostsPage/PostsPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NotFound from './components/Error/NotFound/NotFound';

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
        <ErrorBoundary>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/posts/:id' element={<FullPostPage />} />
                    <Route path='/' element={<PostsPage />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/posts/create' element={<CreatePostPage />} />
                <Route path='/posts/:id/edit' element={<EditPostPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </ErrorBoundary>
    );
}

export default App;
