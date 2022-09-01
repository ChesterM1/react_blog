import Commentaries from '../Commentaries/Commentaries';
import MiniPosts from '../Post/MiniPosts/MiniPosts';
import TagsBar from '../TagsBar/TagsBar';
import styles from './rightInfoBar.module.scss';

const RightInfoBar = () => {
    return (
        <aside className={styles.bar}>
            <TagsBar />

            <div className={styles.mini__posts}>
                <h3>Popular posts</h3>
                <MiniPosts />
                <MiniPosts />
                <MiniPosts />
            </div>
            <div className={styles.comment__bar}>
                <h3>Last comments</h3>
                <Commentaries />
                <Commentaries />
            </div>
        </aside>
    );
};

export default RightInfoBar;
