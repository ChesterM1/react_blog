import userIcon from '../../img/user.png';
import styles from './user.module.scss';


interface propsInterface {
    size?: number;

}
const User: React.FC = ()=>{

    return(
        <div className={styles.user}>
            <div>
               <img src={userIcon} alt="user icon" />
                <div className={styles.userName}>Joe Jordison</div>
            </div>

        </div>
    )
}
export default User;