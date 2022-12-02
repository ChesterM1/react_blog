import styles from './comment.module.scss';
import User from '../User/User';
import likeOut from '../../img/like-outline.png';
import likeFill from '../../img/like-fill.png';
import disLikeOut from '../../img/dislike-outline.png';
import disLikeFill from '../../img/dislike-fill.png';
import { useState, memo } from 'react';

const Commentaries = memo(() => {
    const [like, setLike] = useState<boolean>(false);
    const [dislike, setDislike] = useState<boolean>(false);
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
        <div className={styles.comment}>
            <User fullName={'JOE JORDIOS'} />
            <div className={styles.text}>
                <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae numquam
                    rerum nobis sunt animi debitis voluptatibus dicta iusto quisquam pariatur.
                </span>
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
                <div className={styles.date}>6 hour ago</div>
            </div>
        </div>
    );
});
export default Commentaries;
