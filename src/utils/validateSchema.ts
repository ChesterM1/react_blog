import * as yup from 'yup';

export const loginSchemaValidate = yup.object().shape({
    email: yup
        .string()
        .required('Required field')
        .min(6, 'Minimum 6 characters')
        .max(25, 'Maximum 6 characters')
        .email('Enter correct email'),
    password: yup
        .string()
        .required('Required field')
        .min(5, 'Minimum 5 characters')
        .max(25, 'Maximum 6 characters'),
});

export const registerSchemaValidate = yup.object().shape({
    email: yup
        .string()
        .required('Required field')
        .min(6, 'Minimum 6 characters')
        .max(25, 'Maximum 6 characters')
        .email('Enter correct email'),
    fullName: yup
        .string()
        .required('Required field')
        .min(3, 'Minimum 3 characters')
        .max(25, 'Maximum 26 characters'),
    password: yup
        .string()
        .required('Required field')
        .min(5, 'Minimum 5 characters')
        .max(25, 'Maximum 6 characters'),
    confirmPassword: yup
        .string()
        .required('Required field')
        .min(5, 'Minimum 5 characters')
        .max(25, 'Maximum 6 characters'),
});

export const commentSchemaValidate = yup.object().shape({
    comment: yup.string().required().matches(/\S/),
});
