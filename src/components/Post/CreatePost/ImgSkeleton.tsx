import ContentLoader from 'react-content-loader';

const ImgSkeleton = () => (
    <div>
        <ContentLoader
            speed={2}
            width={'100%'}
            height={'100%'}
            viewBox='1.5 -3 550 350'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'>
            <rect x='3' y='-27' rx='0' ry='0' width='604' height='375' />
        </ContentLoader>
    </div>
);

export default ImgSkeleton;
