import styles from './postTagsBlock.module.scss';
import { TagsInterface } from './types';

const PostTagsBlock: React.FC<TagsInterface> = ({ tags }) => {
    return (
        <div className={styles.tags}>
            <ul>
                {tags.map((item, i) => {
                    return (
                        <a href='#' key={i}>
                            <li>{item}</li>
                        </a>
                    );
                })}
            </ul>
        </div>
    );
};

export default PostTagsBlock;
