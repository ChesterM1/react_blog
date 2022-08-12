import { UserOutlined } from '@ant-design/icons/lib/icons';
import { Avatar } from 'antd';
import styles from './user.module.scss';

const User = ()=>{

    return(
        <div className={styles.user}>
            <div>
                <Avatar size={64} icon={<UserOutlined />} />
                <div className={styles.userName}>Joe Jordison</div>
            </div>

        </div>
    )
}
export default User;