import styles from './login.module.scss';
import icon from '../../../img/user.png';
import spinner from '../../../img/spinner-200.svg';
import * as yup from "yup";
import Input from '../Input/Input';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from "history";

enum InputEnum  {
    email = "email",
    password = "password"
}


const inputField = [{
    input:{
        type: 'text',
        id: "email",
        password: false,
        name: InputEnum.email
    },
    label: {
        htmlFor: 'email',
        text: 'Email'
    }
    },
    {
        input:{
            type: 'password',
            id: "password",
            password: true,
            name: InputEnum.password
        },
        label: {
            htmlFor: 'password',
            text: 'Password'
        }   
    }
    ];

    interface YupErrorsResolve {
        name: string;
        path: string;
        errors: string;
        inner: string[];
    }

    const schema = yup.object().shape({
        email : yup.string()
                .required('Required field')
                .min(6, 'Minimum 6 characters')
                .max(25, 'Maximum 6 characters')
                .email('Enter correct email'),
        password: yup.string()
                .required('Required field')
                .min(5, 'Minimum 5 characters')
                .max(25, 'Maximum 6 characters')
    });


const Login: React.FC = ()=>{

    
    const [inputErrorsMessage, setInputErrorsMessage] = useState({name: '', errors: ''})
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const history = createBrowserHistory({window})
    
    console.log(history.location);
    

      const submit = (e : React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const formProps  = Object.fromEntries(data);

            schema.validate({
                email: formProps.email,
                password: formProps.password
            }).then(res => {
                console.log(res);
                setLoading(true);
                axios.post('https://node-blog-api2.herokuapp.com/auth/login',
                {
                    email: formProps.email,
                    password: formProps.password
                })
                .then(res =>{
                    console.log(res.data);
                    setLoading(false);
                    if(history.location.key === 'default'){
                      return  navigate('/');
                    }
                    history.back();
                    })
                .catch(err => {
                    setServerErrorMessage(err.response.data.message);
                    setLoading(false);
                })
                setInputErrorsMessage({name: '', errors: ''})

            }
            
            ).catch((err: YupErrorsResolve)  => {
                
                if( err.path === 'email'){
                    const errText = err.errors[0];
                    setInputErrorsMessage({ errors: errText, name: err.path})

                }else if ( err.path === 'password'){
                    const errText = err.errors[0]
                    setInputErrorsMessage({ errors: errText, name: err.path})
                }
                
            }
            )
      }
    console.log(inputErrorsMessage);
    
      
    
    

    return(
        <section className={styles.login}>
            <div className={styles.img}>
                <img src={icon} alt="user icon" />
            </div>
            <div className={styles.form}>
                <form onSubmit={ e => submit(e)}>

                    <div className={styles.wrapper}>
                        {serverErrorMessage && <p className={styles.serverError}>{serverErrorMessage} <span onClick={()=> setServerErrorMessage('')}>❌</span></p>}
                       
                       {inputField.map((item, i)=>{

                        const {name, errors} = inputErrorsMessage;
                        const errorRender =  item.input.name === name ? <p className={styles.inputError}>{errors}</p>  : null;
                        return(
                            <div key={i}>
                                
                            <Input input={item.input}
                                    label={item.label}
                                    />
                                {errorRender}
                            </div>
                        )
                       })}
                        

                        
                        <button type='submit' disabled={loading}>{loading && <img className={styles.spinner} src={spinner} alt="spinner" /> }Sign In</button>
                    </div>
                </form>

            </div>
        </section>
    )
};

export default Login;