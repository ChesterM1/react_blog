import styles from './mobileBar.module.scss';
import Commentaries from '../Commentaries/Commentaries';
import MiniPosts from '../MiniPosts/MiniPosts';
import CreatePostButton from '../Post/CreatePostButton/CreatePostButton';
import TagsBar from '../TagsBar/TagsBar';
import NoLoginBlock from '../Header/NoLoginBlock/NoLoginBlock';

const MobileBar = ()=>{

    return(
        <section className={styles.bar}>
            <div className={styles.wrapper}>
                <div className={styles.burger}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.auth}>
                    {true && <NoLoginBlock/>}
                </div>
                <div className={styles.button}>
                    <CreatePostButton/>
                </div>
                <div className={styles.tags}>
                    <TagsBar/>
                </div>
                <div className={styles.post}>
                    <MiniPosts/>
                </div>
                <div className={styles.comment}>
                    <Commentaries/>
                </div>
            </div>
            <div className={styles.bg}></div>
        </section>
    )
}
export default MobileBar;