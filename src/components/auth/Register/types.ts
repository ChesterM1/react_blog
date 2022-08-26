export enum InputEnum {
    fullName = 'fullName',
    email = 'email',
    password = 'password',
    confirmPassword = 'confirmPassword',
}

export interface YupErrorsResolve {
    name: string;
    path: string;
    errors: string;
    inner: string[];
}
