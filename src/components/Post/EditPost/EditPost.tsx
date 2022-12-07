import styles from './editPost.module.scss';
import editImg from '../../../img/pencil.png';
import removeImg from '../../../img/remove.png';
import { PropsInterface } from './types';

const EditPost: React.FC<PropsInterface> = ({ remove, edit }) => {
    return (
        <div className={styles.edit}>
            <div>
                <img onClick={edit} src={editImg} alt='edit icon' />

                <img onClick={remove} src={removeImg} alt='remove icon' />
            </div>
        </div>
    );
};
export default EditPost;
