import styles from './editPost.module.scss';
import edit from '../../../img/pencil.png';
import remove from '../../../img/remove.png';

const EditPost = () => {
    return (
        <div className={styles.edit}>
            <div>
                <img src={edit} alt='edit icon' />
                <img src={remove} alt='remove icon' />
            </div>
        </div>
    );
};
export default EditPost;
