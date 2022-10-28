import CreatePost from '../../components/Post/CreatePost/CreatePost';
import Header from '../../components/Header/Header';
import SkeletonCreatePost from '../../components/Post/CreatePost/SkeletonCreatePost';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../../redux/slices/posts/postsApi';

const EditPostPage = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetPostsQuery('');
    const onePost = data?.find((post) => post._id === id);

    return (
        <div>
            <Header />
            <div style={{ marginTop: '50px' }}>
                {isLoading ? (
                    <SkeletonCreatePost />
                ) : (
                    <CreatePost
                        title={onePost?.title}
                        tags={onePost?.tags.join(', ')}
                        text={onePost?.text}
                        imageUrl={onePost?.imageUrl}
                    />
                )}
            </div>
        </div>
    );
};

export default EditPostPage;
