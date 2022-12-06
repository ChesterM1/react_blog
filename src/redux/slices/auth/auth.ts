import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../utils/axios/axios';
import { LoadStatus } from '../loadStatusTypes';
import { InitialState, LoginFetch, RegisterFetch } from './authTypes';
import { AxiosError } from 'axios';
import { User } from './authTypes';
import { saveLocalStorage } from '../../../utils/serviceLocalStorage';

export const userAuthFetch = createAsyncThunk(
    'user/fetching',
    async (payload: LoginFetch | RegisterFetch, { rejectWithValue }) => {
        if ('fullName' in payload) {
            const { email, password, fullName } = payload;

            return axios
                .post('auth/register', {
                    email,
                    password,
                    fullName,
                })
                .then((res) => {
                    saveLocalStorage(res.data.user);
                    return res.data;
                })
                .catch((err: AxiosError<AxiosError>) =>
                    rejectWithValue(err.response?.data.message)
                );
        } else {
            const { email, password } = payload;
            return axios
                .post('auth/login', payload)
                .then((res) => {
                    saveLocalStorage(res.data.user);
                    return res.data;
                })
                .catch((err: AxiosError<AxiosError>) =>
                    rejectWithValue(err.response?.data.message)
                );
        }
    }
);

const initialState: InitialState = {
    user: null,
    status: LoadStatus.IDLE,
    serverErrorMessage: '',
    isAuth: false,
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        serverErrorMessageCancel(state) {
            state.serverErrorMessage = '';
        },
        authorization(state, { payload }: PayloadAction<User>) {
            state.user = payload;
            state.isAuth = true;
        },
        removeUserFields(state) {
            state.isAuth = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userAuthFetch.pending, (state) => {
            state.status = LoadStatus.LOADING;
        });
        builder.addCase(userAuthFetch.fulfilled, (state, action) => {
            state.status = LoadStatus.IDLE;
            state.user = action.payload.user;
            state.isAuth = true;
        });
        builder.addCase(userAuthFetch.rejected, (state, action) => {
            state.status = LoadStatus.ERROR;
            if (typeof action.payload === 'string') {
                state.serverErrorMessage = action.payload;
            }
        });
    },
});

export default auth.reducer;

export const { serverErrorMessageCancel, authorization, removeUserFields } = auth.actions;
