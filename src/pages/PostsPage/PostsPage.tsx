import { debounce } from 'lodash';
import Post from '../../components/Post/Post';
import { useEffect } from 'react';
import SkeletonPost from '../../components/Post/SkeletonPost';
import { useGetPostsQuery } from '../../redux/slices/posts/postsApi';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setPostCount } from '../../redux/slices/getPostQuery/getPostQuerySlice';
import { useIsMobile } from '../../hooks/useIsMobile';
import MobileMenu from '../../components/Post/MobileMenu/MobileMenu';

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

    const isMobile = useIsMobile();

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
            {isMobile && <MobileMenu popularPost={popularPost} />}

            <div>
                {PostRender}
                {isFetching &&
                    !isLoading &&
                    [...new Array(4)].map((_, i) => <SkeletonPost key={i} />)}
            </div>
        </>
    );
};
export default Home;
