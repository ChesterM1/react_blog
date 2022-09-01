import styles from './miniPosts.module.scss';
import PostBottomBar from '../PostBottomBar/PostBottomBar';

const MiniPosts = () => {
    return (
        <div className={styles.mini__posts}>
            <div className={styles.mini__img}>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiVVrzvJxFLcIOE9oE0OfI7UdITM_hz_flw&usqp=CAU'
                    alt='post pic'
                />
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eum ea</h5>
            </div>
            <div className={styles.bottom}>
                <PostBottomBar view={true} comment={true} />
            </div>
        </div>
    );
};

export default MiniPosts;
