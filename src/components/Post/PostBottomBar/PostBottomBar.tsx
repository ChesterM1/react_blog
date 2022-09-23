import styles from './postBottomBar.module.scss';
import viewIcon from '../../../img/view.svg';
import commentIcon from '../../../img/comments.svg';
import activeComment from '../../../img/chat.png';

import heartRed from '../../../img/heart-svgrepo-com .svg';
import heart from '../../../img/heart.svg';
import { useState } from 'react';
import { BottomBarPropsInterface } from './types';
import { useAppSelector } from '../../../redux/store';

const PostBottomBar: React.FC<BottomBarPropsInterface> = ({ comment, view, like, props }) => {
    const [showComment, setShowComment] = useState<boolean>(false);
    const { user, isAuth } = useAppSelector((state) => state.auth);
    const { createdAt, updatedAt, viewCount, addLike, handleLIKE } = props;
    const activeLike = handleLIKE?.find((elem) => elem === user._id);
    const clickLike = () => {
        if (isAuth) {
            addLike?.();
            return;
        }
        return;
    };
    return (
        <div className={styles.bottom}>
            <div className={styles.right}>
                {view && (
                    <div>
                        <img src={viewIcon} alt='view' />
                        <span>{viewCount}</span>
                    </div>
                )}
                {comment && (
                    <div onClick={() => setShowComment(!showComment)} className={styles.active}>
                        <img src={showComment ? activeComment : commentIcon} alt='comment' />
                        <span>0</span>
                    </div>
                )}
                {like && (
                    <div onClick={clickLike} className={isAuth ? styles.active : ''}>
                        <img
                            src={activeLike ? heartRed : heart}
                            className={styles.heart}
                            alt='comment'
                        />
                        <span>{handleLIKE?.length}</span>
                    </div>
                )}
            </div>
            <div>
                <span className={styles.time}>{createdAt}</span>
            </div>
        </div>
    );
};

export default PostBottomBar;
