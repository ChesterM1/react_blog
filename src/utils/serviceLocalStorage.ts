import { User } from '../redux/slices/auth/authTypes';

export const saveLocalStorage = <T>(obj: T): void => {
    const jsonObj = JSON.stringify(obj);
    window.localStorage.setItem('user', jsonObj);
};

export const getLocalStorage = (name: string): User | undefined => {
    const obj = window.localStorage.getItem(name);
    if (obj) {
        return JSON.parse(obj);
    } else {
        return undefined;
    }
};

export const removeLocalStorage = (name: string): void => {
    window.localStorage.removeItem(name);
};
