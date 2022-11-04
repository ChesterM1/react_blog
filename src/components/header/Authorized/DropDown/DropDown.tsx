import styles from './dropDown.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/store';
import { removeLocalStorage } from '../../../../utils/serviceLocalStorage';
import { removeUserFields } from '../../../../redux/slices/auth/auth';

const DropDown = () => {
    const dispatch = useAppDispatch();

    const SignOut = () => {
        removeLocalStorage('user');
        dispatch(removeUserFields());
    };
    return (
        <ul className={styles.menu}>
            <Link to=''>
                <li>Profile</li>
            </Link>
            <Link to=''>
                <li>My Post</li>
            </Link>

            <Link to=''>
                <li>My Comments</li>
            </Link>

            <Link to='' onClick={SignOut}>
                <li>Sign Out</li>
            </Link>
        </ul>
    );
};
export default DropDown;
