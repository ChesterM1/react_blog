import styles from './home.module.scss';
import Header from '../../components/Header/Header';
import { debounce } from 'lodash';
import Post from '../../components/Post/Post';
import { useEffect, useState } from 'react';
import RightInfoBar from '../../components/RightInfoBar/RightInfoBar';
import SkeletonPost from '../../components/Post/SkeletonPost';
import { useGetPostsQuery } from '../../redux/slices/posts/postsApi';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setPostCount, setPopularPost } from '../../redux/slices/getPostQuery/getPostQuerySlice';
import { useIsMobile } from '../../hooks/useIsMobile';

const tabsTitle = ['New Post', 'Popular Post'];

const Home: React.FC = () => {
    const { getPostCount, popularPost, activeTags } = useAppSelector((store) => store.getPostQuery);
    const dispatch = useAppDispatch();
    const {
        data: posts,
        isLoading,
        isFetching,
        refetch,
    } = useGetPostsQuery({
        limit: getPostCount,
        popular: popularPost,
        activeTags,
    });
    console.log(activeTags);

    const isMobile = useIsMobile();

    const getPopularPost = (num: number) => {
        dispatch(setPopularPost(num));
    };
    const PostRender = isLoading
        ? [...new Array(4)].map((_, i) => <SkeletonPost key={i} />)
        : posts?.data?.map((item) => <Post key={item._id} props={item} />);

    const scrollHandler = debounce((e: Event) => {
        const target = e.target as Document;
        const documentScrollHeight = target.documentElement.scrollHeight;
        const documentScrollTop = target.documentElement.scrollTop;
        const height = window.innerHeight;

        if (documentScrollHeight - (documentScrollTop + height) < 200) {
            if (posts?.totalPost && posts.totalPost > getPostCount) {
                dispatch(setPostCount(getPostCount + 4));
            }
        }
    }, 50);

    useEffect(() => {
        const id = setInterval(refetch, 60000);
        return () => clearInterval(id);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return () => document.removeEventListener('scroll', scrollHandler);
        // eslint-disable-next-line
    }, [isFetching]);

    return (
        <>
            <Header />
            <div className={styles.main}>
                <div className={styles.post__wrapper}>
                    <nav>
                        <ul>
                            {tabsTitle.map((item, i) => {
                                return (
                                    <li
                                        key={i}
                                        className={popularPost === i ? styles.active : ''}
                                        onClick={() => getPopularPost(i)}>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div>
                        {
                            PostRender
                            // popularPost === 0
                            // ? PostRender
                            // : posts?.data.map((item) => <Post key={item._id} props={item} />)
                        }
                        {}
                        {isFetching &&
                            !isLoading &&
                            [...new Array(4)].map((_, i) => <SkeletonPost key={i} />)}
                    </div>
                </div>
                <div className={styles.rightBar}>{!isMobile && <RightInfoBar />}</div>
            </div>
        </>
    );
};
export default Home;
