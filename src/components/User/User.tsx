import userIcon from '../../img/user.png';
import styles from './user.module.scss';
import { UserInterface } from './type';

const User: React.FC<UserInterface> = ({ fullName, avatar }) => {
    return (
        <div className={styles.user}>
            <div>
                <img src={avatar ? avatar : userIcon} alt='user icon' />
                <div className={styles.userName}>{fullName}</div>
            </div>
        </div>
    );
};
export default User;
