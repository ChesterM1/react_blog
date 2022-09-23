import styles from './input.module.scss';
import eye from '../../../img/eye.png';
import hidden from '../../../img/hidden.png';
import { useState } from 'react';
import { InputInterface } from './types';

const Input: React.FC<InputInterface> = ({ input, label, error = false }) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState('');
    const [toggleView, setToggleView] = useState(false);

    const handleFocus = (): boolean => {
        if (value || focus) {
            return true;
        }
        return false;
    };

    return (
        <div className={styles.inputBlock}>
            <label
                style={handleFocus() ? { bottom: '44px' } : { bottom: '' }}
                htmlFor={label.htmlFor}>
                {label.text} {label.require && <span>*</span>}
            </label>
            <input
                type={input.type === 'password' && !toggleView ? 'password' : 'text'}
                id={input.id}
                name={input.name}
                onFocus={() => setFocus(true)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => (value ? setFocus(true) : setFocus(false))}
                style={error ? { border: '1px solid red' } : { border: '1px solid transparent' }}
            />
            {input?.password && value && (
                <img
                    src={toggleView ? hidden : eye}
                    onClick={() => setToggleView(!toggleView)}
                    alt='view icon'
                />
            )}
        </div>
    );
};

export default Input;
