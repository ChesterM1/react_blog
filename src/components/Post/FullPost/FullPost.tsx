import styles from './fullPost.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import User from '../../User/User';
import PostBottomBar from '../PostBottomBar/PostBottomBar';
import PostTagsBlock from '../PostTagsBlock/PostTagsBlock';
import EditPost from '../EditPost/EditPost';
import {
    useDeletePostMutation,
    useGetOnePostQuery,
    useLikePostMutation,
} from '../../../redux/slices/posts/postsApi';
import { PropsInterface } from './types';
import moment from 'moment';
import { useAppSelector } from '../../../redux/store';
import scrollTo from '../../../utils/scrollTo';

const FullPost: React.FC<PropsInterface> = ({ post }) => {
    const { _id, createdAt, updatedAt, imageUrl, like, tags, text, title, user, viewCount } = post;
    const { _id: userId } = useAppSelector((store) => store.auth.user);
    const [edit, setEdit] = useState<boolean>(false);
    const [deletePost] = useDeletePostMutation();
    const [likePost] = useLikePostMutation();
    const navigate = useNavigate();
    useGetOnePostQuery(_id);

    const bottomBarProps = {
        createdAt: moment(createdAt).fromNow(),
        updatedAt: moment(updatedAt).fromNow(),
        viewCount: viewCount,
        handleLIKE: like,
        addLike: () =>
            likePost({
                postId: _id,
                userId,
            }),
    };

    const editPost = userId === user._id;

    const handleDeletePost = () => {
        if (window.confirm('Remove this Post ?')) {
            deletePost(_id);
            navigate('/');
        }
    };

    const sectionRef = useRef<HTMLElement>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section
            ref={sectionRef}
            className={styles.post}
            onMouseEnter={() => setEdit(true)}
            onMouseLeave={() => setEdit(false)}>
            <main>
                <div className={styles.head}>
                    <h1>{title}</h1>
                    <div className={styles.imgBlock}>
                        <img
                            className={styles.img}
                            src={`https://node-blog-api2.herokuapp.com${imageUrl}`}
                            // src='https://img1.akspic.ru/crops/5/3/4/7/6/167435/167435-otrazhenie-legkovyye_avtomobili-ios-shina-koleso-3840x2160.jpg'
                            alt='doge challenger'
                        />
                        <User fullName={user.fullName} />
                    </div>
                </div>

                <article>
                    <ReactMarkdown children={text} />
                </article>
                <div className={styles.bottom}>
                    <PostTagsBlock tags={tags} />
                    <PostBottomBar comment={true} like={true} view={true} props={bottomBarProps} />
                </div>
                {edit && editPost && <EditPost deletePost={handleDeletePost} />}
            </main>
        </section>
    );
};

export default FullPost;
