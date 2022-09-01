import styles from './fullPostPage.module.scss';
import FullPost from '../../components/Post/FullPost/FullPost';
import CommentBlock from '../../components/Post/CommentBlock/CommentBlock';
import RightInfoBar from '../../components/RightInfoBar/RightInfoBar';
import Header from '../../components/Header/Header';

const FullPostPage = () => {
    return (
        <>
            <Header />
            <div className={styles.fullPost}>
                <div className={styles.post}>
                    <div>
                        <FullPost />
                        <CommentBlock />
                    </div>
                </div>
                <div className={styles.rightBar}>
                    <RightInfoBar />
                </div>
            </div>
        </>
    );
};
export default FullPostPage;
