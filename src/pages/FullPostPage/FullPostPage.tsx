import styles from './fullPostPage.module.scss';
import FullPost from '../../components/Post/FullPost/FullPost';
import CommentBlock from '../../components/Post/CommentBlock/CommentBlock';
import RightInfoBar from '../../components/RightInfoBar/RightInfoBar';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../../redux/slices/posts/postsApi';
import SkeletonFullPost from '../../components/Post/FullPost/SkeletonFullPost';
import { Post } from '../../redux/slices/posts/postTypes';

const FullPostPage = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetPostsQuery('');
    const onePost = data?.find((post) => post._id === id);

    const fullPost = isLoading ? <SkeletonFullPost /> : <FullPost post={onePost as Post} />;
    return (
        <>
            <Header />
            <div className={styles.fullPost}>
                <div className={styles.post}>
                    {fullPost}
                    <div className={styles.commentBlock}>
                        <CommentBlock />
                    </div>
                </div>
                <div className={styles.rightBar}>
                    <RightInfoBar />
                </div>
            </div>
        </>
    );
};
export default FullPostPage;
