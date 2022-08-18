import styles from './noLoginBlock.module.scss';

const NoLoginBlock = ()=>{

    return(
        <div className={styles.block}>
            <button className={styles.login}>Log In</button>
            <button className={styles.register}>Sign Up</button>
        </div>
    )
}

export default NoLoginBlock;