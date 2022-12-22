import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import auth from './slices/auth/auth';
import getPostQuery from './slices/getPostQuery/getPostQuerySlice';
import { baseApi } from './slices/posts/baseApi';
import scrollToComment from './slices/scrollToComment/scrollToComment';

export const store = configureStore({
    reducer: {
        auth,
        [baseApi.reducerPath]: baseApi.reducer,
        scrollToComment,
        getPostQuery,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
