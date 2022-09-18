import styles from './header.module.scss';
import icon from '../../img/electric-car.png';
import { Link } from 'react-router-dom';
import NoLoginBlock from './NoLoginBlock/NoLoginBlock';
import Authorized from './Authorized/Authorized';
import { useAppSelector } from '../../redux/store';

const Header: React.FC = () => {
    const auth = useAppSelector((state) => state.auth.isAuth);

    return (
        <div className={styles.header}>
            <Link to='/'>
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
