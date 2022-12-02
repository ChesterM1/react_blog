import styles from './postTagsBlock.module.scss';
import { useAppDispatch } from '../../../redux/store';
import { TagsInterface } from './types';
import { setActiveTags } from '../../../redux/slices/getPostQuery/getPostQuerySlice';

const PostTagsBlock: React.FC<TagsInterface> = ({ tags, active }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.tags}>
            <ul>
                {tags.map((name, i) => {
                    return (
                        <li
                            className={active ? styles.active : null}
                            key={i}
                            onClick={() => dispatch(setActiveTags(name))}>
                            {name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PostTagsBlock;
