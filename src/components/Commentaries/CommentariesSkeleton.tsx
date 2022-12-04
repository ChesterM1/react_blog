import styles from './comment.module.scss';
import ContentLoader from 'react-content-loader';

const CommentariesSkeleton = () => (
    <div className={styles.comment}>
        <ContentLoader
            speed={2}
            width={'95%'}
            height={260}
            // viewBox='0 0 770 400'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'>
            <circle cx='38' cy='43' r='37' />
            <rect x='82' y='37' rx='18' ry='18' width='165' height='30' />
            <rect x='7' y='113' rx='12' ry='12' width='98%' height='31' />
            <rect x='7' y='165' rx='12' ry='12' width='80%' height='31' />
            <circle cx='25' cy='237' r='21' />
            <circle cx='82' cy='236' r='20' />
            <rect x='84%' y='217' rx='12' ry='12' width='16%' height='29' />
        </ContentLoader>
    </div>
);

export default CommentariesSkeleton;
