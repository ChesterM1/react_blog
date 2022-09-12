import { Link } from 'react-router-dom';
import styles from './dropDown.module.scss';

const DropDown = () => {
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

            <Link to=''>
                <li>Sign Out</li>
            </Link>
        </ul>
    );
};
export default DropDown;
