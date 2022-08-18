import styles from './miniPosts.module.scss';
import heart from '../../img/heart.svg';
import wiew from '../../img/view.svg';
import comment from '../../img/comments.svg';
import heartRed from '../../img/heart-svgrepo-com .svg';

const MiniPosts = ()=>{

    return(
            <div className={styles.mini__posts}>
                <div className={styles.mini__img}>
                    <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiVVrzvJxFLcIOE9oE0OfI7UdITM_hz_flw&usqp=CAU" alt="post pic" />
                    <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eum ea</h5>
                </div>
                <div>
                    
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
                </div>
            </div>
    )
}

export default MiniPosts;