import styles from './register.module.scss';
import User from '../../User/User';
import { useRef } from "react";

type refType = {
    current: HTMLInputElement | null;
};


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };




const Register = () => {
    const inputAvatarRef: refType = useRef(null);
    

    const onFinish = (value: any) => {
        console.log(value);
    };
    return (
        <div>

        </div>
    )

};

export default Register;
