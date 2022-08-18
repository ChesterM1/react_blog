import styles from "./home.module.scss";
import Header from "../../components/Header/Header";
import TagsBar from "../../components/TagsBar/TagsBar";
import Commentaries from "../../components/Commentaries/Commentaries";
import Post from "../../components/Post/Post";
import MiniPosts from "../../components/MiniPosts/MiniPosts";
import { useEffect, useState } from "react";
import CreatePostButton from "../../components/Post/CreatePostButton/CreatePostButton";
import MobileBar from "../../components/MobileBar/MobileBar";
import axios from "axios";

const Home: React.FC = () => {
    const [login, setLogin] = useState<any>();
    useEffect(() => {
        axios
            .get("https://node-blog-api2.herokuapp.com/posts")
            .then((res) => setLogin(res.data));
    }, []);
    console.log(login);

    return (
        <>
            <Header />
            <div className={styles.main}>
                <div className={styles.post__wrapper}>
                    <nav>
                        <ul>
                            <li className={styles.active}>New Post</li>
                            <li>Popular Post</li>
                        </ul>
                    </nav>
                    <div className={styles.new}>
                        {[...new Array(5)].map((item, i) => (
                            <Post key={i} />
                        ))}
                    </div>
                    <div className={styles.popular}></div>
                </div>
                <div className={styles.bar}>
                    
                        
                        <TagsBar />
                    
                    <div className={styles.mini__posts}>
                        <h3>Popular posts</h3>
                        <MiniPosts />
                        <MiniPosts />
                        <MiniPosts />
                    </div>
                    <div className={styles.comment__bar}>
                        <h3>Last comments</h3>
                        <Commentaries />
                        <Commentaries />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
