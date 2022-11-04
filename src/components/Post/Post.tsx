import styles from './post.module.scss';
import User from '../User/User';
import PostBottomBar from './PostBottomBar/PostBottomBar';
import EditPost from './EditPost/EditPost';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostTagsBlock from './PostTagsBlock/PostTagsBlock';
import { PostInterface } from './types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { useLikePostMutation, useDeletePostMutation } from '../../redux/slices/posts/postsApi';
import { toComment } from '../../redux/slices/scrollToComment/scrollToComment';
const IMG_URL = process.env.REACT_APP_IMG_URL;

const Post: React.FC<PostInterface> = ({ props }) => {
    const { _id, title, text, tags, viewCount, createdAt, user, like, imageUrl } = props;
    const [selectPost, setSelectPost] = useState<boolean>(false);
    const userAuthId = useAppSelector((state) => state.auth.user?._id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [likePost] = useLikePostMutation();
    const [deletePost] = useDeletePostMutation();

    const handleDeletePost = () => {
        if (window.confirm('Remove this Posts?')) {
            deletePost(_id);
        }
    };
    const bottomBarProps = {
        viewCount,
        handleLIKE: like,
        createdAt: moment(createdAt).fromNow(),
        addLike: () =>
            likePost({
                postId: _id,
                userId: userAuthId ?? '',
            }),
    };
    const scrollToComment = () => {
        dispatch(toComment());
        navigate(`posts/${_id}`);
    };

    const replaceText = () => {
        const regex = /^!\[\w.*]\(\w.*\)$/gm;
        const slice = text.replace(regex, '');
        if (slice.length > 350) {
            return slice.substring(0, 350) + '...';
        }
        return slice;
    };

    return (
        <section
            className={styles.post}
            onMouseEnter={() => setSelectPost(true)}
            onMouseLeave={() => setSelectPost(false)}>
            <div>
                <Link to={`posts/${_id}`}>
                    <div className={styles.head}>
                        {imageUrl && (
                            <img
                                // src='https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mike-b-170811.jpg&fm=jpg'
                                src={`${IMG_URL}${imageUrl}`}
                                alt='post pic'
                                loading='lazy'
                                // src='https://plc.ua/wp-content/uploads/2021/11/vw-jetta-450x253.jpeg'
                            />
                        )}
                        <div className={styles.title}>
                            <h2>{title}</h2>
                        </div>
                    </div>
                </Link>

                <div className={styles.author}>
                    <User fullName={user.fullName} avatar={user.avatar} />
                </div>
            </div>
            <div className={styles.text}>
                <ReactMarkdown children={replaceText()} className={styles.p} />
            </div>

            <div className={styles.bottom}>
                <PostTagsBlock tags={tags} />
                <PostBottomBar
                    comment={true}
                    like={true}
                    view={true}
                    props={bottomBarProps}
                    scrollToComment={scrollToComment}
                />
            </div>

            {user._id === userAuthId && selectPost && (
                <EditPost deletePost={handleDeletePost} id={_id} />
            )}
        </section>
    );
};
export default Post;
