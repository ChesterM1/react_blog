import styles from './serverErrorMessage.module.scss';
import { TextServerErrorInterface } from './types';

const ServerErrorMessage: React.FC<TextServerErrorInterface> = ({ message, hiddenMessage }) => {
    return (
        <p className={styles.serverError}>
            {message} <span onClick={() => hiddenMessage()}>❌</span>
        </p>
    );
};

export default ServerErrorMessage;
