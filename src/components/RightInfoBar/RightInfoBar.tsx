import styles from './rightInfoBar.module.scss';
import Commentaries from '../Commentaries/Commentaries';
import MiniPosts from '../Post/MiniPosts/MiniPosts';
import TagsBar from '../TagsBar/TagsBar';
import { useGetPostsQuery } from '../../redux/slices/posts/postsApi';
import MiniPostSkeleton from '../Post/MiniPosts/miniPostSkeleton';

const RightInfoBar: React.FC = () => {
    const { data: posts, isLoading } = useGetPostsQuery({
        limit: 3,
        popular: 1,
    });

    const miniPostRender = isLoading
        ? [...new Array(3)].map((_, id) => <MiniPostSkeleton key={id} />)
        : posts?.data.map((post) => <MiniPosts posts={post} key={post._id} />);

    return (
        <aside className={styles.bar}>
            <TagsBar />

            <div className={styles.mini__posts}>
                <h3>Popular posts</h3>
                {miniPostRender}
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
