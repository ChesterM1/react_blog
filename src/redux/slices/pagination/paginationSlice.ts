import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './type';

const initialState: InitialState = {
    getPostCount: 4,
};

export const pagination = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPostCount(state, { payload }: PayloadAction<number>) {
            state.getPostCount = payload;
        },
    },
});

export default pagination.reducer;

export const { setPostCount } = pagination.actions;
