import ContentLoader from 'react-content-loader';

const miniPostSkeleton = () => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={305}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'>
        <rect x='2' y='10' rx='7' ry='7' width='98%' height='200' />
        <circle cx='9%' cy='286' r='5%' />
        <circle cx='22%' cy='286' r='5%' />
        <rect x='67%' y='273' rx='11' ry='11' width='30%' height='27' />
    </ContentLoader>
);
//72
export default miniPostSkeleton;
