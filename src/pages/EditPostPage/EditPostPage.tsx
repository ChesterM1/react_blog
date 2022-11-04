import CreatePost from '../../components/Post/CreatePost/CreatePost';
import Header from '../../components/Header/Header';
import SkeletonCreatePost from '../../components/Post/CreatePost/SkeletonCreatePost';
import { useParams } from 'react-router-dom';
import { useGetOnePostQuery } from '../../redux/slices/posts/postsApi';

const EditPostPage = () => {
    const { id } = useParams();
    const { data: posts, isLoading, isError } = useGetOnePostQuery(id as string);

    return (
        <div>
            <Header />
            <div style={{ marginTop: '50px' }}>
                {isLoading ? (
                    <SkeletonCreatePost />
                ) : (
                    <CreatePost
                        title={posts?.title}
                        tags={posts?.tags.join(', ')}
                        text={posts?.text}
                        imageUrl={posts?.imageUrl}
                    />
                )}
            </div>
        </div>
    );
};

export default EditPostPage;
