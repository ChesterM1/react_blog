import styles from './rightBarError.module.scss';
import ErrorImg from '../../../img/right-bar-error.gif';
const RightBarError = () => {
    return (
        <div className={styles.root}>
            <img src={ErrorImg} alt='error' />
        </div>
    );
};

export default RightBarError;
