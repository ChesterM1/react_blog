import styles from './mobileMenu.module.scss';
import { setPopularPost } from '../../../redux/slices/getPostQuery/getPostQuerySlice';
import { useAppDispatch } from '../../../redux/store';
import { MobileMenuProps } from './types';

const tabsTitle = ['New Post', 'Popular Post'];

const MobileMenu: React.FC<MobileMenuProps> = ({ popularPost }) => {
    const dispatch = useAppDispatch();

    const getPopularPost = (num: number) => {
        dispatch(setPopularPost(num));
    };
    return (
        <nav className={styles.menu}>
            <ul>
                {tabsTitle.map((item, i) => {
                    return (
                        <li
                            key={i}
                            className={popularPost === i ? styles.active : ''}
                            onClick={() => getPopularPost(i)}>
                            {item}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default MobileMenu;
