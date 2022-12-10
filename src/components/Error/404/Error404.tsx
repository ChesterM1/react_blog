import style from './error404.module.scss';

const Error404 = () => {
    return (
        <div className={style.root}>
            <div className={style.smile}>😕</div>
            <p>No result found</p>
            <div>We couldn't find what you searched for. Try searching again</div>
        </div>
    );
};

export default Error404;
