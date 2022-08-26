import styles from './validateErrorMessage.module.scss';
import { ErrorMessageInterface } from './types';

const ValidateErrorMessage: React.FC<ErrorMessageInterface> = ({ message }) => {
    return <p className={styles.error}>{message}</p>;
};

export default ValidateErrorMessage;
