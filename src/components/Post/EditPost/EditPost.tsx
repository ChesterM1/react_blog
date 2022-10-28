import styles from './editPost.module.scss';
import edit from '../../../img/pencil.png';
import remove from '../../../img/remove.png';
import { PropsInterface } from './types';
import { Link } from 'react-router-dom';

const EditPost: React.FC<PropsInterface> = ({ deletePost, id }) => {
    return (
        <div className={styles.edit}>
            <div>
                <Link to={`/posts/${id}/edit`}>
                    <img src={edit} alt='edit icon' />
                </Link>
                <img onClick={deletePost} src={remove} alt='remove icon' />
            </div>
        </div>
    );
};
export default EditPost;
