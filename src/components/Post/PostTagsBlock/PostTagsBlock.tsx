import styles from './postTagsBlock.module.scss';

const PostTagsBlock = () => {
    return (
        <div className={styles.tags}>
            <ul>
                <a href='#'>
                    <li>#tag one</li>
                </a>
                <a href='#'>
                    <li>#tag two</li>
                </a>
                <a href='#'>
                    <li>#tag tree</li>
                </a>
            </ul>
        </div>
    );
};

export default PostTagsBlock;
