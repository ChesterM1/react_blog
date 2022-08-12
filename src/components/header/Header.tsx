import styles from './header.module.scss';
import {Button} from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';


const Header = ()=>{



    return(
        <div className={styles.header} >
            <h2>React Blog</h2>
            <div className={styles.auth}>
                <Button className={styles.login} type="ghost"  icon={<UserOutlined />}>Login</Button>
                <Button className={styles.register} type="primary" icon={<UserAddOutlined />}>Sign up</Button>
            </div>
        </div>
    )
};

export default Header;