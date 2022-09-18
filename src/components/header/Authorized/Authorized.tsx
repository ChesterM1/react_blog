import styles from './authorized.module.scss';
import userICon from '../../../img/user.png';
import arrow from '../../../img/arrow.svg';
import DropDown from './DropDown/DropDown';
import { useRef, useState } from 'react';
import Overlay from './DropDown/OverLay/OverLay';
import CreatePostButton from './CreatePostButton/CreatePostButton';
import { useAppSelector } from '../../../redux/store';

const Authorized: React.FC = () => {
    const [dropDown, setDropDown] = useState<boolean>(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const user = useAppSelector((state) => state.auth.user);

    const triggerDropDown = (e: React.MouseEvent) => {
        if (e.currentTarget === dropDownRef.current) {
            setDropDown((state) => !state);
        } else {
            setDropDown(false);
        }
    };

    return (
        <section className={styles.block}>
            <CreatePostButton />
            <menu>
                <div className={styles.user} ref={dropDownRef} onClick={triggerDropDown}>
                    <img className={styles.img} src={user.avatar || userICon} alt='user icon' />
                    <img className={styles.arrow} src={arrow} alt='arrow icon' />
                </div>
                {dropDown && (
                    <>
                        <DropDown />
                        <Overlay trigger={triggerDropDown} />
                    </>
                )}
            </menu>
        </section>
    );
};

export default Authorized;
