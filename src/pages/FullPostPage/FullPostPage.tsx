import styles from './fullPostPage.module.scss';
import FullPost from '../../components/Post/FullPost/FullPost';
import CommentBlock from '../../components/Post/CommentBlock/CommentBlock';
import RightInfoBar from '../../components/RightInfoBar/RightInfoBar';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useGetOnePostQuery } from '../../redux/slices/posts/postsApi';
import SkeletonFullPost from '../../components/Post/FullPost/SkeletonFullPost';
import { Post } from '../../redux/slices/posts/postTypes';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useRef } from 'react';
import scrollTo from '../../utils/scrollTo';
import { cancelToComment } from '../../redux/slices/scrollToComment/scrollToComment';
import { useIsMobile } from '../../hooks/useIsMobile';

const FullPostPage = () => {
    const { id } = useParams();
    const { data: onePost, isLoading, isSuccess, isError } = useGetOnePostQuery(id as string);

    const { scrollToComment } = useAppSelector((state) => state.scrollToComment);
    const dispatch = useAppDispatch();
    const commentBlock = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    console.log(scrollToComment, isSuccess);
    useEffect(() => {
        if (scrollToComment && isSuccess) {
            console.log('render');

            scrollTo(commentBlock, 'start');
            dispatch(cancelToComment());
        } else {
            window.scrollTo(0, 0);
        }
    }, [id, isLoading]);

    const fullPost = isLoading ? <SkeletonFullPost /> : <FullPost post={onePost as Post} />;
    return (
        <>
            <Header />
            <div className={styles.fullPost}>
                <div className={styles.post}>
                    {fullPost}
                    <div className={styles.commentBlock} ref={commentBlock}>
                        <CommentBlock />
                    </div>
                </div>
                <div className={styles.rightBar}>{!isMobile && <RightInfoBar />}</div>
            </div>
        </>
    );
};
export default FullPostPage;
