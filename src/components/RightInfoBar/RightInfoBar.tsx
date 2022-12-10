import styles from './rightInfoBar.module.scss';
import { lazy, Suspense } from 'react';
import Commentaries from '../Commentaries/Commentaries';
import MiniPosts from '../Post/MiniPosts/MiniPosts';
import TagsBar from '../TagsBar/TagsBar';
import { useGetPostsQuery, useLastCommentQuery } from '../../redux/slices/posts/postsApi';
import MiniPostSkeleton from '../Post/MiniPosts/miniPostSkeleton';
import CommentariesSkeleton from '../Commentaries/CommentariesSkeleton';
const RightBarError = lazy(() => import('../Error/RightBarError/RightBarError'));

const RightInfoBar = () => {
    const {
        data: posts,
        isLoading,
        isError: postsError,
    } = useGetPostsQuery({
        limit: 3,
        popular: 1,
    });

    const {
        data: lastComment,
        isLoading: commentLoad,
        isError: commentError,
    } = useLastCommentQuery(2);

    const commentFetchError = commentError ? (
        <Suspense fallback={<CommentariesSkeleton />}>
            <RightBarError />
        </Suspense>
    ) : null;

    const postsFetchError = postsError ? (
        <Suspense fallback={<CommentariesSkeleton />}>
            <RightBarError />
        </Suspense>
    ) : null;

    const miniPostRender = isLoading
        ? [...new Array(3)].map((_, id) => <MiniPostSkeleton key={id} />)
        : posts?.data?.map((post) => <MiniPosts posts={post} key={post._id} />);

    const commentRender = commentLoad
        ? [...new Array(2)].map((_, id) => <CommentariesSkeleton key={id} />)
        : lastComment?.map((item) => <Commentaries props={item} key={item._id} redirect={true} />);
    return (
        <aside className={styles.bar}>
            <TagsBar />

            <div className={styles.mini__posts}>
                <h3>Popular posts</h3>
                {miniPostRender}
                {postsFetchError}
            </div>
            <div className={styles.comment__bar}>
                <h3>Last comments</h3>
                {commentRender}
                {commentFetchError}
            </div>
        </aside>
    );
};

export default RightInfoBar;
