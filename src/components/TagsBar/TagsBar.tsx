import styles from './tagsBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setActiveTags } from '../../redux/slices/getPostQuery/getPostQuerySlice';
import { useNavigate } from 'react-router';
import { useGetTagsQuery } from '../../redux/slices/posts/postsApi';
import TagsBarSkeleton from './TagsBarSkeleton';

const TagsBar = () => {
    const dispatch = useAppDispatch();
    const activeTags = useAppSelector((store) => store.getPostQuery.activeTags);
    const navigate = useNavigate();
    const selectTags = (tagsName: string) => {
        navigate('/');
        dispatch(setActiveTags(tagsName));
    };
    const { data, isLoading } = useGetTagsQuery(4);

    if (isLoading) {
        return <TagsBarSkeleton />;
    }

    return (
        <div className={styles.tagsBar}>
            <h3>Popular Tags</h3>
            <div className={styles.divider}></div>
            <ul>
                {data?.map(({ name, _id }) => {
                    return (
                        <li
                            onClick={() => selectTags(name)}
                            key={_id}
                            className={activeTags === name ? styles.active : null}>
                            {name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TagsBar;
