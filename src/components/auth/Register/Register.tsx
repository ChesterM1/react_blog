import styles from './register.module.scss';
import user from '../../../img/user.png';
import Button from '../../Button/Button';
import { useEffect, useState } from 'react';
import { InputEnum, YupErrorsResolve } from './types';
import Input from '../Input/Input';
import { registerSchemaValidate } from '../../../utils/validateSchema';
import backAfterLogin from '../../../utils/backAfterLogin';
import ValidateErrorMessage from '../ValidateErrorMessage/ValidateErrorMessage';
import ServerErrorMessage from '../ServerErrorMessage/ServerErrorMessage';
import { useNavigate } from 'react-router-dom';
import { serverErrorMessageCancel, userAuthFetch } from '../../../redux/slices/auth/auth';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { LoadStatus } from '../../../redux/slices/loadStatusTypes';

const inputField = [
    {
        input: {
            type: 'text',
            id: InputEnum.email,
            name: InputEnum.email,
        },
        label: {
            htmlFor: InputEnum.email,
            text: 'Email',
            require: true,
        },
    },
    {
        input: {
            type: 'text',
            id: InputEnum.fullName,
            name: InputEnum.fullName,
        },
        label: {
            htmlFor: InputEnum.fullName,
            text: 'Full Name',
            require: true,
        },
    },
    {
        input: {
            type: 'password',
            id: InputEnum.password,
            password: true,
            name: InputEnum.password,
        },
        label: {
            htmlFor: InputEnum.password,
            text: 'Password',
            require: true,
        },
    },
    {
        input: {
            type: InputEnum.password,
            id: InputEnum.confirmPassword,
            password: true,
            name: InputEnum.confirmPassword,
        },
        label: {
            htmlFor: InputEnum.confirmPassword,
            text: 'Confirm password',
            require: true,
        },
    },
];

const Register = () => {
    const [inputErrorsMessage, setInputErrorsMessage] = useState({
        name: '',
        errors: '',
    });
    const { isAuth, serverErrorMessage, status } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);

        const formProps = Object.fromEntries(data);

        registerSchemaValidate
            .validate({
                email: formProps.email,
                fullName: formProps.fullName,
                password: formProps.password,
                confirmPassword: formProps.confirmPassword,
            })
            .then((res) => {
                if (res.password !== res.confirmPassword) {
                    return setInputErrorsMessage({
                        name: 'confirmPassword',
                        errors: 'Passwords do not match',
                    });
                }
                setInputErrorsMessage({ name: '', errors: '' });

                dispatch(
                    userAuthFetch({
                        email: res.email,
                        fullName: res.fullName,
                        password: res.password,
                    })
                );
            })
            .catch((err: YupErrorsResolve) => {
                setInputErrorsMessage({ errors: err.errors[0], name: err.path });
            });
    };

    useEffect(() => {
        if (isAuth) {
            backAfterLogin(navigate);
        }
        // eslint-disable-next-line
    }, [status]);

    return (
        <section className={styles.register}>
            <div className={styles.avatar}>
                <img src={user} alt='user avatar' title='Your avatar' />
            </div>
            <form onSubmit={(e) => submit(e)}>
                {serverErrorMessage && (
                    <ServerErrorMessage
                        message={serverErrorMessage}
                        hiddenMessage={() => dispatch(serverErrorMessageCancel())}
                    />
                )}
                {inputField.map((item, i) => {
                    const { name, errors } = inputErrorsMessage;
                    return (
                        <div key={i}>
                            <Input input={item.input} label={item.label} />
                            {item.input.name === name && <ValidateErrorMessage message={errors} />}
                        </div>
                    );
                })}
                <div className={styles.button}>
                    <Button
                        loading={status === LoadStatus.LOADING ? true : false}
                        text={'Sign Up'}
                        type={'submit'}
                    />
                </div>
            </form>
        </section>
    );
};

export default Register;
