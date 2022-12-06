import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import Commentaries from '../Commentaries/Commentaries';
import styles from './commentBlock.module.scss';
import { commentSchemaValidate } from '../../utils/validateSchema/validateSchema';
import { useAppSelector } from '../../redux/store';
import { CommentBlockProp } from './types';
import { useAddCommentMutation, useGetCommentQuery } from '../../redux/slices/posts/postsApi';
import CommentariesSkeleton from '../Commentaries/CommentariesSkeleton';
import EmptyCommentaries from '../Commentaries/EmptyCommentaries/EmptyCommentaries';

const CommentBlock: React.FC<CommentBlockProp> = ({ postId }) => {
    const [areaValue, setAreaValue] = useState('');
    const [validComment, setValidMessage] = useState<boolean>(true);
    const refArea = useRef<HTMLTextAreaElement>(null);
    const { isAuth, user } = useAppSelector((store) => store.auth);
    const { data, isLoading: commentLoading } = useGetCommentQuery(postId);
    const [addComment, { isLoading }] = useAddCommentMutation();

    const validateAndChange = (e: string): void => {
        setAreaValue(e);
        commentSchemaValidate
            .isValid({
                comment: e,
            })
            .then((res) => setValidMessage(!res));
    };

    const submit = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        if (user) {
            addComment({
                userId: user?._id,
                postId,
                text: areaValue,
            });
        }

        if (!isLoading) {
            setAreaValue('');
            setValidMessage(true);
        }
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

    const commentRender = commentLoading
        ? [...new Array(3)].map((_, i) => <CommentariesSkeleton key={i} />)
        : data?.map((item) => (
              <Commentaries key={item._id} props={item} edit={item.user._id === user?._id} />
          ));
    const comment = data?.length === 0 ? <EmptyCommentaries /> : commentRender;

    return (
        <section className={styles.comment}>
            <form onSubmit={submit}>
                <h3>Commentaries</h3>
                <div
                    className={`${styles.areaWrapper} ${!isAuth && styles.disabled}`}
                    onClick={areaFocus}>
                    <textarea
                        disabled={!isAuth}
                        ref={refArea}
                        rows={1}
                        name='comment'
                        onChange={(e) => validateAndChange(e.target.value)}
                        value={areaValue}
                        placeholder={
                            isAuth ? 'Please enter your comment' : 'Please log in to comment'
                        }
                    />
                    <p></p>
                    <div>
                        <Button
                            loading={isLoading}
                            text={'Add'}
                            disabled={validComment}
                            type='submit'
                        />
                    </div>
                </div>
            </form>
            <div>{comment}</div>
        </section>
    );
};
export default CommentBlock;
