import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import RightInfoBar from '../RightInfoBar/RightInfoBar';
import { useIsMobile } from '../../hooks/useIsMobile';

const Layout = () => {
    const isMobile = useIsMobile();

    return (
        <>
            <Header />
            <div className={styles.main}>
                <div className={styles.post__wrapper}>
                    <Outlet />
                </div>
                <div className={styles.rightBar}>{!isMobile && <RightInfoBar />}</div>
            </div>
        </>
    );
};

export default Layout;
