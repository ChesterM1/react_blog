import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';

const initialState: InitialState = {
    scrollToComment: false,
};

export const scrollToComment = createSlice({
    name: 'scrollToComment',
    initialState,
    reducers: {
        toComment: (state) => {
            state.scrollToComment = true;
        },
        cancelToComment: (state) => {
            state.scrollToComment = false;
        },
    },
});

export default scrollToComment.reducer;

export const { toComment, cancelToComment } = scrollToComment.actions;
