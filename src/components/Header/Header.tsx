import styles from './header.module.scss';
import icon from '../../img/electric-car.png';
import { Link } from 'react-router-dom';
import NoLoginBlock from './NoLoginBlock/NoLoginBlock';
import Authorized from './Authorized/Authorized';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { resetValue } from '../../redux/slices/getPostQuery/getPostQuerySlice';
import { useGetPostsQuery } from '../../redux/slices/posts/baseApi';

const Header: React.FC = () => {
    const auth = useAppSelector((state) => state.auth.isAuth);
    const dispatch = useAppDispatch();
    const { refetch } = useGetPostsQuery({ limit: 4, popular: 0 });
    const goHome = () => {
        dispatch(resetValue());
        refetch();
    };

    return (
        <div className={styles.header}>
            <Link to='/' onClick={goHome}>
                <div className={styles.logo}>
                    <div className={styles.img}>
                        <img src={icon} alt='car Logo' />
                    </div>
                    <h2> React Blog</h2>
                </div>
            </Link>

            {auth ? <Authorized /> : <NoLoginBlock />}
        </div>
    );
};

export default Header;
