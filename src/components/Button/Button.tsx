import styles from './button.module.scss';
import spinner from '../../img/spinner-200.svg';
import { ButtonInterface } from './types';

const Button: React.FC<ButtonInterface> = ({
    type = 'button',
    loading,
    text,
    onClick,
    disabled = false,
}) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={styles.button}
            onClick={() => onClick?.()}>
            {loading && <img className={styles.spinner} src={spinner} alt='spinner' />}
            {text}
        </button>
    );
};

export default Button;
