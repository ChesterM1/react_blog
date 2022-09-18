import styles from './home.module.scss';
import Header from '../../components/Header/Header';
import TagsBar from '../../components/TagsBar/TagsBar';
import Commentaries from '../../components/Commentaries/Commentaries';
import Post from '../../components/Post/Post';
import MiniPosts from '../../components/Post/MiniPosts/MiniPosts';
import { useEffect, useState } from 'react';
import RightInfoBar from '../../components/RightInfoBar/RightInfoBar';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { fetchPosts } from '../../redux/slices/posts/posts';
import { LoadStatus } from '../../redux/slices/loadStatusTypes';
import axios from '../../utils/axios/axios';
import { Post as posts } from '../../redux/slices/posts/postTypes';

const tabsTitle = ['New Post', 'Popular Post'];

const Home: React.FC = () => {
    const [activeTabs, setActiveTabs] = useState<number>(0);
    const { status, allPosts } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    if (status !== LoadStatus.IDLE) {
        return <div>'LOADING'</div>;
    }

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
                            ? allPosts.map((item, i) => <Post key={i} />) //[...new Array(1)].map((item, i) => <Post key={i} />)
                            : [...new Array(2)].map((item, i) => <Post key={i} />)}
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
