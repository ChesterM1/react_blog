import styles from './miniPosts.module.scss';
import defaultImg from '../../../img/default-image.png';
import { MimiPostProps } from './types';
import PostBottomBar from '../PostBottomBar/PostBottomBar';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { toComment } from '../../../redux/slices/scrollToComment/scrollToComment';

const IMG_URL = process.env.REACT_APP_IMG_URL;

const MiniPosts: React.FC<MimiPostProps> = ({ posts }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const scrollToComment = () => {
        dispatch(toComment());
        navigate(`/posts/${posts._id}`);
    };

    const props = {
        createdAt: moment(posts.createdAt).fromNow(),
        viewCount: posts.viewCount,
        commentCount: posts.comment,
    };
    return (
        <div className={styles.mini__posts}>
            <Link to={'/posts/' + posts._id}>
                <div className={styles.mini__img}>
                    <img
                        src={posts.imageUrl ? IMG_URL + posts.imageUrl : defaultImg}
                        alt='post pic'
                    />

                    <h5>{posts.title}</h5>
                </div>
            </Link>
            <div className={styles.bottom}>
                <PostBottomBar
                    view={true}
                    comment={true}
                    props={props}
                    scrollToComment={scrollToComment}
                />
            </div>
        </div>
    );
};

export default MiniPosts;
