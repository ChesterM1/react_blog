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
import { useAppSelector } from '../../redux/store';

const Commentaries: React.FC<CommentariesProps> = ({ props }) => {
    const [like, setLike] = useState<boolean>(false);
    const [dislike, setDislike] = useState<boolean>(false);
    const [viewEditBorder, setViewEditBorder] = useState<boolean>(false);
    const { user, text, createdAt } = props;
    const userId = useAppSelector((store) => store.auth.user?._id);

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

    return (
        <div
            className={styles.comment}
            onMouseEnter={() => setViewEditBorder(true)}
            onMouseLeave={() => setViewEditBorder(false)}>
            <User fullName={user.fullName} />
            <div className={styles.text}>
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
            {viewEditBorder && userId === user._id && (
                <EditPost
                    deletePost={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                    id={''}
                />
            )}
        </div>
    );
};
export default Commentaries;
