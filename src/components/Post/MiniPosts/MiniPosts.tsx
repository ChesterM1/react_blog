import styles from './miniPosts.module.scss';
import PostBottomBar from '../PostBottomBar/PostBottomBar';

const MiniPosts = () => {
    const obj = {
        createdAt: '2022-08-17T02:40:48.873+00:00',
        updatedAt: '2022-08-17T02:40:48.873+00:00',
        viewCount: 0,
    };
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
                <PostBottomBar view={true} comment={true} props={obj} />
            </div>
        </div>
    );
};

export default MiniPosts;
