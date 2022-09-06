import styles from './createPostPage.module.scss';
import CreatePost from '../../components/Post/CreatePost/CreatePost';
import Header from '../../components/Header/Header';

const CreatePostPage = () => {
    return (
        <div className={styles.createPost}>
            <Header />
            <div className={styles.createBlock}>
                <CreatePost />
            </div>
        </div>
    );
};

export default CreatePostPage;
