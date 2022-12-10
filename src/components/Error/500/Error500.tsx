import style from './error500.module.scss';
import error from '../../../img/Error500.jpg';

const Error = () => {
    return (
        <div className={style.root}>
            <div className={style.img}>
                <img src={error} alt='error' />
            </div>
            <div className={style.server}>Server Error</div>
            <h1>
                <span>500</span> Something went wrong
            </h1>
        </div>
    );
};

export default Error;
