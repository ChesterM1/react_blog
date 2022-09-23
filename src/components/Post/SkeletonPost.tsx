import ContentLoader from 'react-content-loader';

const SkeletonPost = () => {
    return (
        <ContentLoader
            style={{ marginBottom: 60 }}
            speed={2}
            width={'100%'}
            height={'600px'}
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'>
            <rect x='1' y='1' rx='0' ry='0' width='100%' height='387' />
            <rect x='1' y='130' rx='0' ry='0' width='28' height='4' />
            <circle cx='43' cy='436' r='38' />
            <rect x='88' y='422' rx='0' ry='0' width='113' height='28' />
            <rect x='1' y='482' rx='0' ry='0' width='100%' height='81' />
            <rect x='381' y='541' rx='0' ry='0' width='110' height='10' />
            <rect x='14' y='579' rx='0' ry='0' width='105' height='27' />
            <rect x='126' y='579' rx='0' ry='0' width='105' height='27' />
            <rect x='237' y='579' rx='0' ry='0' width='105' height='27' />
            <circle cx='27' cy='626' r='15' />
            <circle cx='63' cy='626' r='15' />
            <circle cx='100' cy='626' r='15' />
            <rect x='700' y='615' rx='0' ry='0' width='104' height='20' />
        </ContentLoader>
    );
};

export default SkeletonPost;
