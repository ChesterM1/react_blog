import styles from './login.module.scss';
import icon from '../../../img/user.png';
import { useEffect, useState } from 'react';
import backAfterLogin from '../../../utils/backAfterLogin';
import Input from '../Input/Input';
import { InputEnum, YupErrorsResolve } from './types';
import { loginSchemaValidate } from '../../../utils/validateSchema';
import Button from '../../Button/Button';
import ValidateErrorMessage from '../ValidateErrorMessage/ValidateErrorMessage';
import ServerErrorMessage from '../ServerErrorMessage/ServerErrorMessage';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { userAuthFetch } from '../../../redux/slices/auth/auth';
import { LoadStatus } from '../../../redux/slices/loadStatusTypes';
import { useNavigate } from 'react-router-dom';
import { serverErrorMessageCancel } from '../../../redux/slices/auth/auth';

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
    const { status, serverErrorMessage, isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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
                dispatch(userAuthFetch(res));
            })
            .catch((err: YupErrorsResolve) => {
                const errText = err.errors[0];
                setInputErrorsMessage({ errors: errText, name: err.path });
            });
    };
    useEffect(() => {
        if (isAuth) {
            backAfterLogin(navigate);
        }
        // eslint-disable-next-line
    }, [isAuth]);

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
                                hiddenMessage={() => dispatch(serverErrorMessageCancel())}
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
                            <Button
                                type={'submit'}
                                loading={status === LoadStatus.LOADING ? true : false}
                                text={'Sign In'}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
