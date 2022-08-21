import { Link } from 'react-router-dom';
import styles from './noLoginBlock.module.scss';

const NoLoginBlock = ()=>{

    return(
        <div className={styles.block}>
            <Link to='/login'>
                <button className={styles.login}>Log In</button>
            </Link>
            <button className={styles.register}>Sign Up</button>
        </div>
    )
}

export default NoLoginBlock;