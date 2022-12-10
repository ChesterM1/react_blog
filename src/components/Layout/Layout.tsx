import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import RightInfoBar from '../RightInfoBar/RightInfoBar';
import { useIsMobile } from '../../hooks/useIsMobile';
import React, { Suspense } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
const ErrorGif = React.lazy(() => import('../Error/RightBarError/RightBarError'));

// const renderBar = <ErrorBoundary></ErrorBoundary>;
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
