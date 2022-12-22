import styles from './fullPost.module.scss';
import defaultImg from '../../../img/default-image.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import User from '../../User/User';
import PostBottomBar from '../PostBottomBar/PostBottomBar';
import PostTagsBlock from '../PostTagsBlock/PostTagsBlock';
import EditPost from '../EditPost/EditPost';
import { PropsInterface } from './types';
import moment from 'moment';
import { useAppSelector } from '../../../redux/store';
import {
    useDeletePostMutation,
    useLikePostMutation,
    useUnLikePostMutation,
} from '../../../redux/slices/posts/postsApi';
const IMG_URL = process.env.REACT_APP_IMG_URL;

const FullPost: React.FC<PropsInterface> = ({ post }) => {
    const { _id, createdAt, updatedAt, imageUrl, like, tags, text, title, user, viewCount } = post;
    const userId = useAppSelector((store) => store.auth.user?._id);
    const [edit, setEdit] = useState<boolean>(false);
    const [deletePost] = useDeletePostMutation();
    const [likePost] = useLikePostMutation();
    const [unLikePost] = useUnLikePostMutation();
    const navigate = useNavigate();

    const bottomBarProps = {
        createdAt: moment(createdAt).fromNow(),
        updatedAt: moment(updatedAt).fromNow(),
        viewCount: viewCount,
        handleLIKE: like,
        commentCount: post.comment,
        addLike: () =>
            likePost({
                postId: _id,
                userId: userId ?? '',
            }),
        unLike: () =>
            unLikePost({
                postId: _id,
                userId: userId ?? '',
            }),
    };

    const editPost = userId === user._id;

    const handleDeletePost = () => {
        if (window.confirm('Remove this Post ?')) {
            deletePost(_id);
            navigate('/');
        }
    };

    const handleEdit = () => {
        navigate(`/posts/${_id}/edit`);
    };

    return (
        <section
            className={styles.post}
            onMouseEnter={() => setEdit(true)}
            onMouseLeave={() => setEdit(false)}>
            <main>
                <div className={styles.head}>
                    <h1>{title}</h1>
                    <div className={styles.imgBlock}>
                        <img
                            className={styles.img}
                            src={imageUrl ? IMG_URL + imageUrl : defaultImg}
                            alt='post img'
                            loading='lazy'
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
                {edit && editPost && <EditPost remove={handleDeletePost} edit={handleEdit} />}
            </main>
        </section>
    );
};

export default FullPost;
