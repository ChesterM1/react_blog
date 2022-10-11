import ContentLoader from 'react-content-loader';

const SkeletonFullPost = () => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={800}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'>
        <rect x='6' y='76' rx='0' ry='0' width='100%' height='387' />
        <rect x='28' y='130' rx='0' ry='0' width='28' height='4' />
        <circle cx='47' cy='510' r='38' />
        <rect x='92' y='494' rx='0' ry='0' width='113' height='28' />
        <rect x='4' y='723' rx='0' ry='0' width='105' height='27' />
        <rect x='119' y='723' rx='0' ry='0' width='105' height='27' />
        <rect x='233' y='722' rx='0' ry='0' width='105' height='27' />
        <circle cx='23' cy='776' r='15' />
        <circle cx='60' cy='775' r='15' />
        <circle cx='97' cy='775' r='15' />
        <rect x='89%' y='760' rx='0' ry='0' width='104' height='20' />
        <rect x='4' y='45' rx='0' ry='0' width='100%' height='23' />
        <rect x='5' y='12' rx='0' ry='0' width='100%' height='23' />
        <rect x='209' y='12' rx='0' ry='0' width='100%' height='23' />
        <rect x='6' y='557' rx='0' ry='0' width='100%' height='23' />
        <rect x='6' y='590' rx='0' ry='0' width='100%' height='23' />
        <rect x='6' y='623' rx='0' ry='0' width='100%' height='23' />
        <rect x='6' y='655' rx='0' ry='0' width='100%' height='23' />
        <rect x='6' y='689' rx='0' ry='0' width='100%' height='23' />
    </ContentLoader>
);

export default SkeletonFullPost;
