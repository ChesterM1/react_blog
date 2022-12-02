import React from 'react';
import ContentLoader from 'react-content-loader';

const TagsBarSkeleton = () => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={100}
        backgroundColor='#ebeaea'
        foregroundColor='#e6e6e6'>
        <rect x='5%' y='79' rx='0' ry='0' width='15%' height='12' />
        <rect x='30%' y='79' rx='0' ry='0' width='15%' height='12' />
        <rect x='55%' y='79' rx='0' ry='0' width='15%' height='12' />
        <rect x='80%' y='79' rx='0' ry='0' width='15%' height='12' />
        <circle cx='5%' cy='85' r='6' />
        <circle cx='20%' cy='85' r='6' />
        <circle cx='30%' cy='85' r='6' />
        <circle cx='45%' cy='85' r='6' />
        <circle cx='55%' cy='85' r='6' />
        <circle cx='70%' cy='85' r='6' />
        <circle cx='80%' cy='85' r='6' />
        <circle cx='95%' cy='85' r='6' />
        <rect x='7' y='1' rx='5' ry='5' width='98%' height='13' />
        <rect x='7' y='22' rx='5' ry='5' width='80%' height='13' />
        <rect x='7' y='44' rx='5' ry='5' width='65%' height='13' />
    </ContentLoader>
);

export default TagsBarSkeleton;
