import styles from "./post.module.scss";
import wiew from '../../img/view.svg';
import comment from '../../img/comments.svg';
import heartRed from '../../img/heart-svgrepo-com .svg';
import heart from '../../img/heart.svg';
import edit from '../../img/pencil.png';
import remove from '../../img/remove.png';
import Commentaries from "../Commentaries/Commentaries";




const Post = () => {

   const time = ()=>{
        const date = new Date().getTime();
        
        const neww = new Date(date)
    return neww.toString();
   }
    return (
        <section className={styles.post}>
            <div>
                <img
                    src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mike-b-170811.jpg&fm=jpg"
                    alt="post pic"
                />
                <div className={styles.title}>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
                </div>

            </div>
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
            <div className={styles.bottom}>
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
                    <span className={styles.time}>2 hours ago</span>
                </div>
            </div>
            {true && <div className={styles.edit}>
                <div>
                    <img src={edit} alt="edit icon" />
                    <img src={remove} alt="remove icon" />
                </div>
            </div>}
            <div className={styles.commentBlock}>
                <div className={styles.one}></div>
                <div className={styles.two}></div>
                <div className={styles.three}>
                    <Commentaries/>
                    <Commentaries/>
                    <Commentaries/>
                    <button>
                       <span>Load more</span>
                    </button>
                </div>
            </div>
        </section>
    );
};
export default Post;
