import styles from './home.module.scss';
import Header from '../../components/Header/Header';
import TagsBar from '../../components/TagsBar/TagsBar';
import Commentaries from '../../components/Commentaries/Commentaries';
import Post from '../../components/Post/Post';
import MiniPosts from '../../components/Post/MiniPosts/MiniPosts';
import { useEffect, useState } from 'react';
import RightInfoBar from '../../components/RightInfoBar/RightInfoBar';
import SkeletonPost from '../../components/Post/SkeletonPost';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { fetchPosts } from '../../redux/slices/posts/posts';
import { LoadStatus } from '../../redux/slices/loadStatusTypes';

const tabsTitle = ['New Post', 'Popular Post'];

const Home: React.FC = () => {
    const [activeTabs, setActiveTabs] = useState<number>(0);
    const { status, allPosts } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    const PostRender =
        status === LoadStatus.LOADING
            ? [...new Array(4)].map((_, i) => <SkeletonPost key={i} />)
            : allPosts.map((item, i) => <Post key={item._id} props={item} />);

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
                            : allPosts.map((item, i) => <Post key={item._id} props={item} />)}
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
