import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './type';

const initialState: InitialState = {
    getPostCount: 4,
    popularPost: 0,
    activeTags: undefined,
};

export const getPostQuery = createSlice({
    name: 'getPostQuery',
    initialState,
    reducers: {
        setPostCount(state, { payload }: PayloadAction<number>) {
            state.getPostCount = payload;
        },
        setPopularPost(state, { payload }: PayloadAction<number>) {
            state.popularPost = payload;
        },
        setActiveTags(state, { payload }: PayloadAction<string>) {
            state.activeTags = payload;
        },
        resetValue(state) {
            state.activeTags = undefined;
            state.getPostCount = 4;
            state.popularPost = 0;
        },
    },
});

export default getPostQuery.reducer;

export const { setPostCount, setPopularPost, setActiveTags, resetValue } = getPostQuery.actions;
