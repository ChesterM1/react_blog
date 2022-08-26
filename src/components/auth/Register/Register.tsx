import styles from './register.module.scss';
import user from '../../../img/user.png';
import Button from '../../Button/Button';
import { useState } from 'react';
import { InputEnum, YupErrorsResolve } from './types';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { registerSchemaValidate } from '../../../utils/validateSchema';
import axios from 'axios';
import backAfterLogin from '../../../utils/backAfterLogin';
import ValidateErrorMessage from '../ValidateErrorMessage/ValidateErrorMessage';
import ServerErrorMessage from '../ServerErrorMessage/ServerErrorMessage';

const inputField = [
    {
        input: {
            type: 'text',
            id: InputEnum.email,
            password: false,
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
            password: false,
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
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const [inputErrorsMessage, setInputErrorsMessage] = useState({
        name: '',
        errors: '',
    });
    const [serverErrorMessage, setServerErrorMessage] = useState('');

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
                console.log(res);
                if (res.password !== res.confirmPassword) {
                    return setInputErrorsMessage({
                        name: 'confirmPassword',
                        errors: 'Passwords do not match',
                    });
                }
                setInputErrorsMessage({ name: '', errors: '' });
                setButtonLoading(true);
                axios
                    .post('https://node-blog-api2.herokuapp.com/auth/register', {
                        email: res.email,
                        fullName: res.fullName,
                        password: res.password,
                    })
                    .then((res) => {
                        console.log(res.data);
                        setButtonLoading(false);
                        backAfterLogin();
                    })
                    .catch((err) => {
                        setServerErrorMessage(err.response.data.message);
                        setButtonLoading(false);
                    });
            })
            .catch((err: YupErrorsResolve) => {
                setInputErrorsMessage({ errors: err.errors[0], name: err.path });
            });
    };

    return (
        <section className={styles.register}>
            <div className={styles.avatar}>
                <img src={user} alt='user avatar' title='Your avatar' />
            </div>
            <form onSubmit={(e) => submit(e)}>
                {serverErrorMessage && (
                    <ServerErrorMessage
                        message={serverErrorMessage}
                        hiddenMessage={() => setServerErrorMessage('')}
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
                <div className='mt-10'>
                    <Button loading={buttonLoading} text={'Sign Up'} type={'submit'} />
                </div>
            </form>
        </section>
    );
};

export default Register;
