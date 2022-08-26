export enum InputEnum {
    email = 'email',
    password = 'password',
}

export interface YupErrorsResolve {
    name: string;
    path: string;
    errors: string;
    inner: string[];
}
