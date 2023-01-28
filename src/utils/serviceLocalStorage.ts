import { User } from '../redux/slices/auth/authTypes';

interface UserWithTimeStamp extends User {
    timeStamp: number;
}
export const saveLocalStorage = <T extends User>(obj: T): void => {
    const timeStamp = new Date().getTime();
    const objWidthTimeStamp: UserWithTimeStamp = { ...obj, timeStamp };
    const jsonObj = JSON.stringify(objWidthTimeStamp);
    window.localStorage.setItem('user', jsonObj);
};

export const removeLocalStorage = (name: string): void => {
    window.localStorage.removeItem(name);
};

export const getLocalStorage = (name: string): User | undefined => {
    const obj = window.localStorage.getItem(name);
    const timeNow = Date.now();

    if (obj) {
        const user: UserWithTimeStamp = JSON.parse(obj);
        const differenceTime = timeNow - user.timeStamp;
        const getDayUserStorage = differenceTime / (1000 * 60 * 60 * 24);
        console.log('render get');

        console.log(getDayUserStorage);

        if (getDayUserStorage > 28) {
            removeLocalStorage(name);
            return undefined;
        }
        return user;
    } else {
        return undefined;
    }
};
