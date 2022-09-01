import styles from './postBottomBar.module.scss';
import wiew from '../../../img/view.svg';
import commentIcon from '../../../img/comments.svg';
import activeComment from '../../../img/chat.png';

import heartRed from '../../../img/heart-svgrepo-com .svg';
import heart from '../../../img/heart.svg';
import { useState } from 'react';
import { BottomBarPropsInterface } from './types';

const PostBottomBar: React.FC<BottomBarPropsInterface> = ({ comment, view, like }) => {
    const [showComment, setShowComment] = useState<boolean>(false);
    const [isLike, setIsLike] = useState<boolean>(false);

    return (
        <div className={styles.bottom}>
            <div className={styles.right}>
                {view && (
                    <div>
                        <img src={wiew} alt='view' />
                        <span>0</span>
                    </div>
                )}
                {comment && (
                    <div onClick={() => setShowComment(!showComment)}>
                        <img src={showComment ? activeComment : commentIcon} alt='comment' />
                        <span>0</span>
                    </div>
                )}
                {like && (
                    <div onClick={() => setIsLike(!isLike)}>
                        <img
                            src={isLike ? heartRed : heart}
                            className={styles.heart}
                            alt='comment'
                        />
                        <span>1.2k</span>
                    </div>
                )}
            </div>
            <div>
                <span className={styles.time}>2 hours ago</span>
            </div>
        </div>
    );
};

export default PostBottomBar;
