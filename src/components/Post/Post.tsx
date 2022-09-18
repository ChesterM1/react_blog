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

const Post: React.FC = () => {
    //    const time = ()=>{
    //         const date = new Date().getTime();

    //         const neww = new Date(date)
    //     return neww.toString();
    //    }
    // const [showComment, setShowComment] = useState<boolean>(false);
    // const [isLike, setIsLike] = useState<boolean>(false);
    const [selectPost, setSelectPost] = useState<boolean>(false);

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
                            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
                        </div>
                    </div>
                </Link>

                <div className={styles.author}>
                    <User />
                </div>
            </div>
            <div className={styles.text}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium recusandae
                    consequuntur officiis aperiam reprehenderit modi ex itaque omnis laborum
                    dolores, deserunt et mollitia quae consequatur iste dolorum expedita tenetur
                    explicabo?{' '}
                </p>
            </div>

            <div className={styles.bottom}>
                <PostTagsBlock />
                <PostBottomBar comment={true} like={true} view={true} />
            </div>

            {selectPost && <EditPost />}
            {/* {showComment && (
                <div className={styles.commentBlock}>
                    {[...new Array(2)].map((item, i) => {
                        return <Commentaries key={i} />;
                    })}

                    <div className='w-40 m-auto '>
                        <Button loading={false} text={'Load more'} />
                    </div>
                </div>
            )} */}
        </section>
    );
};
export default Post;
