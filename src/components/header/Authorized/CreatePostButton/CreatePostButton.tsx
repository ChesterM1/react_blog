import styles from './createPostButton.module.scss';
import icon from '../../../../img/online.png';
import { Link } from 'react-router-dom';

const CreatePostButton = () => {
    return (
        <Link to='/posts/create'>
            <div className={styles.button}>
                <img src={icon} alt='post icon' />
                <span>New post</span>
            </div>
        </Link>
    );
};

export default CreatePostButton;
