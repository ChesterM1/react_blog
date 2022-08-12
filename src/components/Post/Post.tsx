import styles from "./post.module.scss";
import wiew from '../../img/view.svg';
import comment from '../../img/comments.svg';
import heartRed from '../../img/heart-svgrepo-com .svg';
import heart from '../../img/heart.svg';
import moment from "moment";


const Post = () => {

   const time = ()=>{
    moment().format('YYYY-MM-DD HH:mm:ss');
    return moment().fromNow();
   }
    return (
        <section className={styles.post}>
            <img
                src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mike-b-170811.jpg&fm=jpg"
                alt="post pic"
            />
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
            <div className={styles.text}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laudantium recusandae consequuntur officiis aperiam
                    reprehenderit modi ex itaque omnis laborum dolores, deserunt
                    et mollitia quae consequatur iste dolorum expedita tenetur
                    explicabo?{" "}
                </p>
            </div>
            <div className={styles.tags}>
                <ul>
                    <a href="#">
                        <li>#tag one</li>
                    </a>
                    <a href="#">
                        <li>#tag two</li>
                    </a>
                    <a href="#">
                        <li>#tag tree</li>
                    </a>
                </ul>
            </div>
            <div className={styles.botoom}>
                <div className={styles.right}>
                    <div>
                        <img src={wiew} alt="view"/>
                        <span>0</span> 
                    </div>
                    <div>
                    <img src={comment} alt="comment"/>
                        <span>0</span> 
                    </div>
                    <div>
                    <img src={heart} className={styles.heart} alt="comment"/>
                    <span>1.2k</span>
                    </div>
                </div>
                <div>
                    <span>{time()}</span>
                </div>
            </div>
        </section>
    );
};
export default Post;
