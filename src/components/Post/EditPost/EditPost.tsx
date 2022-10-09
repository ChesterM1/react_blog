import styles from './editPost.module.scss';
import edit from '../../../img/pencil.png';
import remove from '../../../img/remove.png';
import { PropsInterface } from './types';

const EditPost: React.FC<PropsInterface> = ({ deletePost }) => {
    return (
        <div className={styles.edit}>
            <div>
                <img src={edit} alt='edit icon' />
                <img onClick={deletePost} src={remove} alt='remove icon' />
            </div>
        </div>
    );
};
export default EditPost;
