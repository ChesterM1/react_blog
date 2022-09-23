import { configureStore } from '@reduxjs/toolkit';
import posts from './slices/posts/posts';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import auth from './slices/auth/auth';

export const store = configureStore({
    reducer: {
        posts,
        auth,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
