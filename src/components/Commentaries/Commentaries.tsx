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
    useRemoveDislikeCommentMutation,
    useRemoveLikeCommentMutation,
} from '../../redux/slices/posts/postsApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toComment } from '../../redux/slices/scrollToComment/scrollToComment';

const Commentaries: React.FC<CommentariesProps> = ({ props, edit, redirect }) => {
    const [viewEditBorder, setViewEditBorder] = useState<boolean>(false);
    const {
        user,
        text,
        createdAt,
        postId,
        likedCount,
        dislikeCount,
        isLiked,
        IsDisliked,
        remove,
        edit: editComment,
    } = props;
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [likedComment] = useLikeCommentMutation();
    const [removeLikeComment] = useRemoveLikeCommentMutation();
    const [dislikeComment] = useDislikeCommentMutation();
    const [removeDislikeComment] = useRemoveDislikeCommentMutation();

    const like = () => {
        if (!isAuth) {
            return;
        }
        if (!props.isLiked) {
            likedComment({
                commentId: props._id,
                userId: props.user._id,
                postId: props.postId,
            });
        } else if (props.isLiked) {
            removeLikeComment({
                commentId: props._id,
                userId: props.user._id,
                postId: props.postId,
            });
        }
    };

    const dislike = () => {
        if (!isAuth) {
            return;
        }
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

    const redirectToPost = () => {
        if (!redirect) {
            return;
        }
        dispatch(toComment());
        navigate(`/posts/${postId}`);
    };
    const dataComment =
        createdAt === props.updatedAt
            ? moment(createdAt).fromNow()
            : `update ${moment(props.updatedAt).fromNow()}`;
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
                            src={isLiked && isAuth ? likeFill : likeOut}
                            alt='like'
                            onClick={like}
                            className={isAuth ? styles.likeActive : null}
                        />
                        <span>{likedCount}</span>
                    </div>
                    <div>
                        <img
                            src={IsDisliked && isAuth ? disLikeOut : disLikeFill}
                            alt='dislike'
                            onClick={dislike}
                            className={isAuth ? styles.likeActive : null}
                        />
                        <span>{dislikeCount}</span>
                    </div>
                </div>
                <div className={styles.date}>{dataComment}</div>
            </div>
            {viewEditBorder && edit && (
                <EditPost
                    remove={() => remove?.(props._id, postId)}
                    edit={() => editComment?.(text, props._id)}
                />
            )}
        </div>
    );
};
export default Commentaries;
