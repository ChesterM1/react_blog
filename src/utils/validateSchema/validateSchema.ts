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

export const createPostSchemaValidate = yup.object().shape({
    image: yup
        .mixed()
        .test({
            message: 'Please provide a supported file type',
            test: (file: File, context) => {
                const isValid = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'application/octet-stream',
                ].includes(file.type);

                if (!isValid) context?.createError();
                return isValid;
            },
        })
        .test({
            message: `File too big, can't exceed ${5}mb`,
            test: (file: File) => {
                const isValid = file.size < 5e6;
                return isValid;
            },
        }),
    text: yup.string().required('Required field').min(10, 'Minimum 10 characters'),
    tags: yup
        .string()
        .required('Required field')
        .matches(/(^#\S\w*)(,\s#\w*)*?\S$/, { message: 'Format : #tagOne, #tagTwo' })
        .min(3, 'Minimum 3 characters'),
    title: yup.string().required('Required field').min(3, 'Minimum 3 characters'),
});
