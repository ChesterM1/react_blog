import styles from './rightInfoBar.module.scss';
import Commentaries from '../Commentaries/Commentaries';
import MiniPosts from '../Post/MiniPosts/MiniPosts';
import TagsBar from '../TagsBar/TagsBar';
import { useGetPostsQuery } from '../../redux/slices/posts/postsApi';

const RightInfoBar: React.FC = () => {
    const { data: posts, isLoading } = useGetPostsQuery({
        limit: 3,
        popular: 1,
    });
    if (isLoading) {
        return <h1>LOADING...</h1>;
    }

    return (
        <aside className={styles.bar}>
            <TagsBar />

            <div className={styles.mini__posts}>
                <h3>Popular posts</h3>
                {posts?.data.map((post) => (
                    <MiniPosts posts={post} key={post._id} />
                ))}
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
