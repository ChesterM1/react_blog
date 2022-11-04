import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import auth from './slices/auth/auth';
import pagination from './slices/pagination/paginationSlice';
import { postsApi } from './slices/posts/postsApi';
import scrollToComment from './slices/scrollToComment/scrollToComment';

export const store = configureStore({
    reducer: {
        auth,
        [postsApi.reducerPath]: postsApi.reducer,
        scrollToComment,
        pagination,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
