import styles from './overLay.module.scss';
import ReactDOM from 'react-dom';
import { OverLayInterface } from './types';

const rootElem = document.getElementById('root') as HTMLElement;
const Overlay: React.FC<OverLayInterface> = ({ trigger }) => {
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={(e) => trigger(e)}></div>,
        rootElem
    );
};

export default Overlay;
