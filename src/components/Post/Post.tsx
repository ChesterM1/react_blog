import styles from './post.module.scss';
// import wiew from '../../img/view.svg';
// import comment from '../../img/comments.svg';
// import activeComment from '../../img/chat.png';

// import heartRed from '../../img/heart-svgrepo-com .svg';
// import heart from '../../img/heart.svg';
// import edit from '../../img/pencil.png';
// import remove from '../../img/remove.png';
import Commentaries from '../Commentaries/Commentaries';
import User from '../User/User';
import Button from '../Button/Button';
import PostBottomBar from './PostBottomBar/PostBottomBar';
import EditPost from './EditPost/EditPost';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostTagsBlock from './PostTagsBlock/PostTagsBlock';
import { PostInterface } from './types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import moment from 'moment-timezone';
import { likePost } from '../../redux/slices/posts/posts';

const Post: React.FC<PostInterface> = ({ props }) => {
    const { _id, title, text, tags, viewCount, createdAt, updatedAt, user, like } = props;
    const [selectPost, setSelectPost] = useState<boolean>(false);
    const userAuthId = useAppSelector((state) => state.auth.user._id);
    const dispatch = useAppDispatch();
    const newObj = {
        viewCount,
        handleLIKE: like,
        createdAt: moment(createdAt).fromNow(),
        updatedAt: moment(updatedAt).fromNow(),
        addLike: () =>
            dispatch(
                likePost({
                    postId: _id,
                    userId: userAuthId,
                })
            ),
    };
    const replaceText = () => {
        return text.substring(0, 350) + '...';
    };

    return (
        <section
            className={styles.post}
            onMouseEnter={() => setSelectPost(true)}
            onMouseLeave={() => setSelectPost(false)}>
            <div>
                <Link to='post/1'>
                    <div className={styles.head}>
                        <img
                            src='https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mike-b-170811.jpg&fm=jpg'
                            alt='post pic'
                            // src='https://plc.ua/wp-content/uploads/2021/11/vw-jetta-450x253.jpeg'
                        />
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
                <p>{replaceText()}</p>
            </div>

            <div className={styles.bottom}>
                <PostTagsBlock tags={tags} />
                <PostBottomBar comment={true} like={true} view={true} props={newObj} />
            </div>

            {user._id === userAuthId && selectPost && <EditPost />}
        </section>
    );
};
export default Post;
