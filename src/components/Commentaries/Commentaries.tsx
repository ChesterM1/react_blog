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
import {
    useDislikeCommentMutation,
    useLikeCommentMutation,
    useRemoveCommentMutation,
    useRemoveDislikeCommentMutation,
    useRemoveLikeCommentMutation,
} from '../../redux/slices/posts/postsApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { toComment } from '../../redux/slices/scrollToComment/scrollToComment';

const Commentaries: React.FC<CommentariesProps> = ({ props, edit, redirect }) => {
    // const [like, setLike] = useState<boolean>(false);
    // const [dislike, setDislike] = useState<boolean>(false);
    const [viewEditBorder, setViewEditBorder] = useState<boolean>(false);
    const { user, text, createdAt, postId, likedCount, dislikeCount, isLiked, IsDisliked } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [removeComment] = useRemoveCommentMutation();
    // const handleLike = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    //     const target = e.target as HTMLImageElement;
    //     if (target.alt === 'like') {
    //         setDislike(false);
    //         setLike((like) => !like);
    //         likedComment({ commentId: props._id, userId: props.user._id });
    //     } else if (target.alt === 'dislike') {
    //         setLike(false);
    //         setDislike((dislike) => !dislike);
    //     }
    // };

    const [likedComment] = useLikeCommentMutation();
    const [removeLikeComment] = useRemoveLikeCommentMutation();
    const [dislikeComment] = useDislikeCommentMutation();
    const [removeDislikeComment] = useRemoveDislikeCommentMutation();

    const like = () => {
        if (!props.isLiked) {
            likedComment({ commentId: props._id, userId: props.user._id, postId: props.postId });
        } else if (props.isLiked) {
            removeLikeComment({
                commentId: props._id,
                userId: props.user._id,
                postId: props.postId,
            });
        }
    };

    const dislike = () => {
        if (!props.IsDisliked) {
            dislikeComment({ commentId: props._id, userId: props.user._id, postId: props.postId });
        } else if (props.IsDisliked) {
            removeDislikeComment({
                commentId: props._id,
                userId: props.user._id,
                postId: props.postId,
            });
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
                        <img src={isLiked ? likeFill : likeOut} alt='like' onClick={like} />
                        <span>{likedCount}</span>
                    </div>
                    <div>
                        <img
                            src={IsDisliked ? disLikeOut : disLikeFill}
                            alt='dislike'
                            onClick={dislike}
                        />
                        <span>{dislikeCount}</span>
                    </div>
                </div>
                <div className={styles.date}>{moment(createdAt).fromNow()}</div>
            </div>
            {viewEditBorder && edit && <EditPost deletePost={deleteComment} id={''} />}
        </div>
    );
};
export default Commentaries;
