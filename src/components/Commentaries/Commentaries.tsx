import styles from './comment.module.scss';
import User from '../User/User';
import likeOut from '../../img/like-outline.png';
import likeFill from '../../img/like-fill.png';
import disLikeOut from '../../img/dislike-outline.png';
import disLikeFill from '../../img/dislike-fill.png';
import { useState } from 'react';
import { CommentariesProps } from './types';
import moment from 'moment';
import EditPost from '../Post/EditPost/EditPost';
import { useRemoveCommentMutation } from '../../redux/slices/posts/postsApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { toComment } from '../../redux/slices/scrollToComment/scrollToComment';

const Commentaries: React.FC<CommentariesProps> = ({ props, edit, redirect }) => {
    const [like, setLike] = useState<boolean>(false);
    const [dislike, setDislike] = useState<boolean>(false);
    const [viewEditBorder, setViewEditBorder] = useState<boolean>(false);
    const { user, text, createdAt, postId } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [removeComment] = useRemoveCommentMutation();
    const handleLike = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLImageElement;
        if (target.alt === 'like') {
            setDislike(false);
            setLike((like) => !like);
        } else if (target.alt === 'dislike') {
            setLike(false);
            setDislike((dislike) => !dislike);
        }
    };

    const deleteComment = () => {
        if (window.confirm('Confirm comment deletion?')) {
            removeComment({ id: props._id, postId });
        }
    };
    const redirectToPost = () => {
        if (!redirect) {
            return;
        }
        dispatch(toComment());
        navigate(`/posts/${postId}`);
    };

    return (
        <div
            className={styles.comment}
            onMouseEnter={() => setViewEditBorder(true)}
            onMouseLeave={() => setViewEditBorder(false)}>
            <User fullName={user.fullName} />
            <div
                className={`${styles.text} ${redirect ? styles.active : null}`}
                onClick={redirectToPost}>
                <span>{text}</span>
            </div>
            <div className={styles.bottom}>
                <div className={styles.likeBlock}>
                    <div>
                        <img
                            src={like ? likeFill : likeOut}
                            alt='like'
                            onClick={(e) => handleLike(e)}
                        />
                        <span>2</span>
                    </div>
                    <div>
                        <img
                            src={dislike ? disLikeOut : disLikeFill}
                            alt='dislike'
                            onClick={(e) => handleLike(e)}
                        />
                        <span>11</span>
                    </div>
                </div>
                <div className={styles.date}>{moment(createdAt).fromNow()}</div>
            </div>
            {viewEditBorder && edit && <EditPost deletePost={deleteComment} id={''} />}
        </div>
    );
};
export default Commentaries;
