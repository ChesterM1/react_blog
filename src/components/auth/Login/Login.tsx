import styles from './login.module.scss';
import icon from '../../../img/user.png';
import { useRef, useState } from 'react';
import Input from '../Input/Input';

const inputField = [{
    input:{
        type: 'text',
        id: 'email',
        password: false,
    },
    label: {
        htmlFor: 'email',
        text: 'Email'
    }
    },
    {
        input:{
            type: 'password',
            id: 'password',
            password: true,
        },
        label: {
            htmlFor: 'password',
            text: 'Password'
        }   
    }
    ]

const Login: React.FC = ()=>{

    const InputRef = useRef(null);
    console.log(InputRef);
    
    
    

    return(
        <section className={styles.login}>
            <div className={styles.img}>
                <img src={icon} alt="user icon" />
            </div>
            <div className={styles.form}>
                <form action="#">
                    <div className={styles.wrapper}>
                       {/* <div className={styles.inputBlock}>
                        <label htmlFor="email">
                                Email
                                
                            </label>
                            <input type="text" id='email' />
                       </div>
                       <div className={styles.inputBlock}>
                        <label htmlFor="password">
                                Password
                            </label>
                            <input ref={InputRef} type={inputChek? "text" : "password"} id='password' value={input} onChange={e => setInput(e.target.value)}/>
                       </div> */}
                       
                       {inputField.map((item, i)=>{
                        return <Input input={item.input} label={item.label} key={i}/>
                       })}
                        
                        <button type='submit'>Sign In</button>
                    </div>
                </form>

            </div>
        </section>
    )
};

export default Login;