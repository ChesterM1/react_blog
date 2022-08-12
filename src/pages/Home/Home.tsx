import styles from './home.module.scss'; 
import Header from "../../components/header/Header";
import TagsBar from "../../components/TagsBar/TagsBar";
import Commentaries from '../../components/Commentaries/Commentaries';
import Post from '../../components/Post/Post';
import { Tabs } from 'antd';
import MiniPosts from '../../components/MiniPosts/MiniPosts';


const { TabPane } = Tabs;

const Home = ()=>{

    return(
       <>
            <Header/>
           <div className={styles.main}>
               <div className={styles.post__wrapper}>
               <Tabs size='large' destroyInactiveTabPane={true}>   
                    <TabPane tab={<NewPostTitle/>} key="1">
                            {[...new Array(5)].map((item, i)=> <Post key={i}/>)}
                    </TabPane>
                    <TabPane tab={<PopularPostTitle/>} key="2">
                        {[...new Array(2)].map((item, i)=> <Post key={i}/>)}
                    </TabPane>   
                </Tabs> 
                    

               </div>
               <div className={styles.bar}>
                    <TagsBar/>
                    <div className={styles.mini__posts}>
                        <h3 >Popular posts</h3>
                        <MiniPosts/>
                        <MiniPosts/>
                        <MiniPosts/>
                    </div>
                    <div className={styles.comment__bar}>
                        <h3>Last comments</h3>
                        <Commentaries/>
                        <Commentaries/>
                    </div>
               </div>
               
           </div>
           
        </>
    )
}
export default Home;

const NewPostTitle = ()=>{
    return (
        <h3 className={styles.tab}>
            New post 
        </h3>
    )
}

const PopularPostTitle = ()=>{
    return (
        <h3 className={styles.tab}>
            PopularPostTitle 
        </h3>
    )
}

