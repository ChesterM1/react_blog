import ContentLoader from 'react-content-loader';

const SkeletonCreatePost = () => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={'700'}
        backgroundColor='#ededed'
        foregroundColor='#e6e6e6'>
        <rect x='504' y='862' rx='0' ry='0' width='113' height='28' />
        <rect x='541' y='865' rx='0' ry='0' width='105' height='27' />
        <circle cx='574' cy='878' r='15' />
        <rect x='41' y='862' rx='0' ry='0' width='603' height='23' />
        <rect x='0' y='31' rx='0' ry='0' width='100%' height='460' />
        <rect x='0' y='341' rx='0' ry='0' width='100%' height='470' />
    </ContentLoader>
);

export default SkeletonCreatePost;
