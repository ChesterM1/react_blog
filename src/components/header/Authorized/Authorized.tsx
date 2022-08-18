import CreatePostButton from '../../Post/CreatePostButton/CreatePostButton';
import styles from './authorized.module.scss';

const Authorized = ()=>{

    return(
        <section className={styles.block}>
            <CreatePostButton/>
            <button>Sign Out</button>
        </section>
    )
}

export default Authorized;