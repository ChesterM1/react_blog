import { LoadStatus } from '../loadStatusTypes';

export interface ResponseSuccesses {
    user: User;
}

export interface User {
    fullName: string;
    email: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    token: string;
    avatar?: string;
}

export interface InitialState {
    user: User;
    status: LoadStatus;
    serverErrorMessage: string;
    isAuth: boolean;
}

export interface LoginFetch {
    email: string;
    password: string;
}

export interface RegisterFetch extends LoginFetch {
    fullName: string;
}
