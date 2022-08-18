import styles from './createPostButton.module.scss';
import icon from '../../../img/online.png';


const CreatePostButton = ()=>{

    return(
        <div className={styles.button}>
            <img src={icon} alt="post icon" />
            <span>Create new post</span>
        </div>
    )
}

export default CreatePostButton;