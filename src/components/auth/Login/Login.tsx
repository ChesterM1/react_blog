import styles from './login.module.scss';
import icon from '../../../img/user.png';
import Input from '../Input/Input';
import { useState } from 'react';
// import axios from 'axios';
import axios from '../../../utils/axios/axios';
import backAfterLogin from '../../../utils/backAfterLogin';
import { InputEnum, YupErrorsResolve } from './types';
import { loginSchemaValidate } from '../../../utils/validateSchema';
import Button from '../../Button/Button';
import ValidateErrorMessage from '../ValidateErrorMessage/ValidateErrorMessage';
import ServerErrorMessage from '../ServerErrorMessage/ServerErrorMessage';

const inputField = [
    {
        input: {
            type: 'text',
            id: 'email',
            name: InputEnum.email,
        },
        label: {
            htmlFor: 'email',
            text: 'Email',
        },
    },
    {
        input: {
            type: 'password',
            id: 'password',
            password: true,
            name: InputEnum.password,
        },
        label: {
            htmlFor: 'password',
            text: 'Password',
        },
    },
];

const Login: React.FC = () => {
    const [inputErrorsMessage, setInputErrorsMessage] = useState({
        name: '',
        errors: '',
    });
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const formProps = Object.fromEntries(data);

        loginSchemaValidate
            .validate({
                email: formProps.email,
                password: formProps.password,
            })
            .then((res) => {
                console.log(res);
                setLoading(true);
                axios
                    .post('auth/login', {
                        email: res.email,
                        password: res.password,
                    })
                    .then((res: any) => {
                        console.log(res.data);
                        setLoading(false);
                        backAfterLogin();
                    })
                    .catch((err: any) => {
                        setServerErrorMessage(err.response.data.message);
                        setLoading(false);
                    });
            })
            .catch((err: YupErrorsResolve) => {
                const errText = err.errors[0];
                setInputErrorsMessage({ errors: errText, name: err.path });
            });
    };

    return (
        <section className={styles.login}>
            <div className={styles.img}>
                <img src={icon} alt='user icon' />
            </div>
            <div className={styles.form}>
                <form onSubmit={(e) => submit(e)}>
                    <div className={styles.wrapper}>
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
                                    {item.input.name === name && (
                                        <ValidateErrorMessage message={errors} />
                                    )}
                                </div>
                            );
                        })}

                        <div className={styles.button}>
                            <Button type={'submit'} loading={loading} text={'Sign In'} />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
