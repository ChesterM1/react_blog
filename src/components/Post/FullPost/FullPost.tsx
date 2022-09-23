import styles from './fullPost.module.scss';
import User from '../../User/User';
import PostBottomBar from '../PostBottomBar/PostBottomBar';
import PostTagsBlock from '../PostTagsBlock/PostTagsBlock';
import EditPost from '../EditPost/EditPost';
import { useState } from 'react';

const FullPost = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const obj = {
        createdAt: '2022-08-17T02:40:48.873+00:00',
        updatedAt: '2022-08-17T02:40:48.873+00:00',
        viewCount: 0,
    };
    return (
        <section
            className={styles.post}
            onMouseEnter={() => setEdit(true)}
            onMouseLeave={() => setEdit(false)}>
            <main>
                <div className={styles.head}>
                    <h1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
                        vero?
                    </h1>
                    <div className={styles.imgBlock}>
                        <img
                            className={styles.img}
                            src='https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnN8ZW58MHx8MHx8&w=1000&q=80'
                            // src='https://img1.akspic.ru/crops/5/3/4/7/6/167435/167435-otrazhenie-legkovyye_avtomobili-ios-shina-koleso-3840x2160.jpg'
                            alt='doge challenger'
                        />
                        <User fullName={'Joe Jordison'} />
                    </div>
                </div>

                <article>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptatum illum
                    maiores quas, sequi, labore ducimus iure aliquid quaerat debitis molestias.
                    Veritatis, repellendus nobis! Suscipit optio aspernatur distinctio iure nihil,
                    alias reiciendis dolor ex ad doloribus? Architecto ab eum reprehenderit fugiat
                    voluptates neque cumque, perspiciatis saepe asperiores sed odit praesentium hic
                    tempora dicta molestias officia culpa quae at autem! Praesentium doloremque
                    tenetur quod! Consequatur et exercitationem quae reprehenderit vero qui facilis
                    est hic in soluta suscipit amet aliquid quo pariatur numquam rerum, id cumque
                    eos? Explicabo soluta molestiae totam, maxime sunt voluptatem vero, cumque
                    consequatur commodi voluptas vel labore odio?
                </article>
                <div className={styles.bottom}>
                    <PostTagsBlock tags={['#one', '#two', '#three']} />
                    <PostBottomBar comment={true} like={true} view={true} props={obj} />
                </div>
                {edit && <EditPost />}
            </main>
        </section>
    );
};

export default FullPost;
