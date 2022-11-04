import styles from './home.module.scss';
import Header from '../../components/Header/Header';
import { debounce } from 'lodash';
import Post from '../../components/Post/Post';
import { useEffect, useState } from 'react';
import RightInfoBar from '../../components/RightInfoBar/RightInfoBar';
import SkeletonPost from '../../components/Post/SkeletonPost';
import { useGetPostsQuery } from '../../redux/slices/posts/postsApi';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setPostCount } from '../../redux/slices/pagination/paginationSlice';

const tabsTitle = ['New Post', 'Popular Post'];

const Home: React.FC = () => {
    const [activeTabs, setActiveTabs] = useState<number>(0);
    const postLimit = useAppSelector((store) => store.pagination.getPostCount);
    const dispatch = useAppDispatch();

    const { data: posts, isLoading, isFetching, refetch } = useGetPostsQuery(postLimit);

    const PostRender = isLoading
        ? [...new Array(4)].map((_, i) => <SkeletonPost key={i} />)
        : posts?.data?.map((item, i) => <Post key={item._id} props={item} />);

    const scrollHandler = debounce((e: Event) => {
        const target = e.target as Document;
        const documentScrollHeight = target.documentElement.scrollHeight;
        const documentScrollTop = target.documentElement.scrollTop;
        const height = window.innerHeight;

        if (documentScrollHeight - (documentScrollTop + height) < 200 && posts?.totalPost) {
            if (posts.totalPost > postLimit) {
                dispatch(setPostCount(postLimit + 4));
            }
        }
    }, 50);

    useEffect(() => {
        const id = setInterval(refetch, 60000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return () => document.removeEventListener('scroll', scrollHandler);
    }, [isLoading]);

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
                                        className={activeTabs === i ? styles.active : ''}
                                        onClick={() => setActiveTabs(i)}>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div>
                        {activeTabs === 0
                            ? PostRender
                            : posts?.data.map((item, i) => <Post key={item._id} props={item} />)}
                        {isFetching && [...new Array(4)].map((_, i) => <SkeletonPost key={i} />)}
                    </div>
                </div>
                <div className={styles.rightBar}>
                    <RightInfoBar />
                </div>
            </div>
        </>
    );
};
export default Home;
