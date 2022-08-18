import styles from './comment.module.scss';

import User from '../User/User';


const Commentaries = ()=>{
  return(
    <div className={styles.comment}>
      <User/>
      <div className={styles.text}>
        <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae numquam rerum nobis sunt animi debitis voluptatibus dicta iusto quisquam pariatur.</span>
      </div>
      <div className={styles.date}>6 hour ago</div>
    </div>
  )
}
export default Commentaries;