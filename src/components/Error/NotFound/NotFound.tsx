import styles from './notFound.module.scss';
import Button from '../../Button/Button';
import Header from '../../Header/Header';
import Error404 from '../404/Error404';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <Header />
            <Error404 />

            <Link to='/' className={styles.button}>
                <Button loading={false} text={'Go home'} />
            </Link>
        </>
    );
};

export default NotFound;
