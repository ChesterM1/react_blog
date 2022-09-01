import { useEffect, useRef, useState } from 'react';
import Button from '../../Button/Button';
import Commentaries from '../../Commentaries/Commentaries';
import styles from './commentBlock.module.scss';
import { commentSchemaValidate } from '../../../utils/validateSchema';

const CommentBlock = () => {
    const [areaValue, setAreaValue] = useState('');
    const [validComment, setValidMessage] = useState<boolean>(true);
    const refArea = useRef<HTMLTextAreaElement>(null);

    const validateAndChange = (e: string): void => {
        setAreaValue(e);
        commentSchemaValidate
            .isValid({
                comment: e,
            })
            .then((res) => setValidMessage(!res));
    };
    const areaFocus = () => {
        if (refArea && refArea.current) {
            refArea.current.focus();
        }
    };

    const calcHeightArea = (): void => {
        if (refArea && refArea.current) {
            refArea.current.style.height = '0px';
            const scrollHeight = refArea.current.scrollHeight;
            refArea.current.style.height = scrollHeight + 'px';
        }
    };

    useEffect(() => {
        calcHeightArea();
    }, [areaValue]);

    return (
        <section className={styles.comment}>
            <form onSubmit={() => true}>
                <h3>Commentaries</h3>
                <div className={styles.areaWrapper} onClick={areaFocus}>
                    <textarea
                        ref={refArea}
                        rows={1}
                        name='comment'
                        onChange={(e) => validateAndChange(e.target.value)}
                        value={areaValue}
                        placeholder={'Please enter your comment'}
                    />
                    <p></p>
                    <div>
                        <Button loading={false} text={'Add'} disabled={validComment} />
                    </div>
                </div>
            </form>
            <div>
                <Commentaries />
                <Commentaries />
                <Commentaries />
                <Commentaries />
            </div>
        </section>
    );
};
export default CommentBlock;
