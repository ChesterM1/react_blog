import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios/axios';
import { LoadStatus } from '../loadStatusTypes';
import { InitialState, LoginFetch, RegisterFetch } from './authTypes';
import { saveLocalStorage } from '../../../utils/serviceLocalStorage';
import { AxiosError } from 'axios';

export const userAuthFetch = createAsyncThunk(
    'user/fetching',
    async (payload: LoginFetch | RegisterFetch, { rejectWithValue }) => {
        console.log(payload);
        if ('fullName' in payload) {
            const { email, password, fullName } = payload;

            return axios
                .post('auth/register', {
                    email,
                    password,
                    fullName,
                })
                .then((res) => res.data)
                .catch((err: AxiosError<AxiosError>) =>
                    rejectWithValue(err.response?.data.message)
                );
        } else {
            const { email, password } = payload;
            return axios
                .post('auth/login', {
                    email,
                    password,
                })
                .then((res) => res.data)
                .catch((err: AxiosError<AxiosError>) =>
                    rejectWithValue(err.response?.data.message)
                );
        }
    }
);

const initialState: InitialState = {
    user: {
        _id: '',
        token: '',
        fullName: '',
        email: '',
        avatar: '',
        createdAt: '',
        updatedAt: '',
    },
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
    },
    extraReducers: (builder) => {
        builder.addCase(userAuthFetch.pending, (state) => {
            state.status = LoadStatus.LOADING;
        });
        builder.addCase(userAuthFetch.fulfilled, (state, action) => {
            state.status = LoadStatus.IDLE;
            state.user = action.payload.user;
            state.isAuth = true;
            saveLocalStorage(action.payload.user);
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

export const { serverErrorMessageCancel } = auth.actions;
