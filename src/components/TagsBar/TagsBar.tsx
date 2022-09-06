import styles from './tagsBar.module.scss';

const TagsBar = () => {
    return (
        <div className={styles.tagsBar}>
            <h3>Popular Tags</h3>
            <div className={styles.divider}></div>
            <ul>
                <a href='#'>
                    <li>#React</li>
                </a>
                <a href='#'>
                    <li>#TypeScript</li>
                </a>
                <a href='#'>
                    <li>#JavaScript</li>
                </a>
                <a href='#'>
                    <li>#Redux</li>
                </a>
            </ul>
        </div>
    );
};

export default TagsBar;
