import styles from './createPost.module.scss';
import { useEffect, useRef, useState } from 'react';
import Button from '../../Button/Button';
import ImgSkeleton from './ImgSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import SimpleEditor from '../SimpleEditor/SimpleEditor';
import { createPostSchemaValidate } from '../../../utils/validateSchema/validateSchema';
import { YupErrorsResolve } from '../../../utils/validateSchema/type';
import ValidateErrorMessage from '../../auth/ValidateErrorMessage/ValidateErrorMessage';
import scrollTo from '../../../utils/scrollTo';
import { useCreatePostMutation } from '../../../redux/slices/posts/postsApi';

const CreatePost = () => {
    const [blobLinkImg, setBlobLinkImg] = useState<string>('');
    const [inputValueImg, setInputValueImg] = useState<string>('');
    const [fieldError, setFieldError] = useState({
        name: '',
        error: '',
    });
    const fileImgRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [createPost, { data, isLoading, isSuccess }] = useCreatePostMutation();

    const triggeredInput = () => {
        if (fileImgRef && fileImgRef.current) {
            fileImgRef.current.click();
        }
    };

    const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileType = e.target.files[0].type;
            if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
                const url = URL.createObjectURL(e.target.files[0]);
                setBlobLinkImg(url);
                setInputValueImg(e.target.value);
                return;
            }
        }
        setBlobLinkImg('');
        setInputValueImg('');
        return;
    };

    const errorReset = () => {
        setFieldError({ name: '', error: '' });
    };

    const resetImgLink = () => {
        if (window.confirm('Remove this image?')) {
            setBlobLinkImg('');
            setInputValueImg('');
        }
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as (typeof e.target & HTMLFormElement) & HTMLFormElement[];
        const formData = new FormData(target);
        formData.append('text', target[4].value);
        const formProps = Object.fromEntries(formData) as {
            image: File;
            text: string;
            title: string;
            tags: string;
        };

        createPostSchemaValidate
            .validate({
                image: formProps.image,
                title: formProps.title,
                text: formProps.text,
                tags: formProps.tags,
            })
            .then(() => {
                createPost(formData);
            })
            .catch((err: YupErrorsResolve) => {
                setFieldError({ name: err.path, error: err.errors[0] });
                scrollTo([titleRef, textRef, tagsRef, imageRef], err.path, 'smooth');
            });
    };
    useEffect(() => {
        if (isSuccess && data) {
            navigate(`/post/${data.post._id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
        <section className={styles.create}>
            <form onSubmit={submit}>
                <div className={styles.head}>
                    <div className={styles.imgBlock}>
                        {blobLinkImg ? (
                            <div
                                className={styles.img}
                                ref={imageRef}
                                data-element={'image'}
                                style={
                                    fieldError.name === 'image'
                                        ? { border: '2px solid red', borderRadius: '7px' }
                                        : { border: '2px solid transparent' }
                                }>
                                <img src={blobLinkImg} alt='post img' />
                                <span onClick={resetImgLink}></span>
                            </div>
                        ) : (
                            <ImgSkeleton />
                        )}

                        <div className={styles.button} onClick={triggeredInput}>
                            <input
                                type='file'
                                accept='image/*'
                                hidden
                                ref={fileImgRef}
                                value={inputValueImg}
                                onChange={uploadImg}
                                name='image'
                            />
                            <Button loading={false} text={'Upload img'} />
                        </div>
                    </div>
                    <div className={styles.titleBlock}>
                        <input
                            data-element={'title'}
                            ref={titleRef}
                            onFocus={errorReset}
                            name='title'
                            type='text'
                            placeholder='Enter the title'
                            style={
                                fieldError.name === 'title'
                                    ? { borderBottom: '2px solid red' }
                                    : { borderBottom: '' }
                            }
                        />
                        <input
                            data-element={'tags'}
                            ref={tagsRef}
                            onFocus={errorReset}
                            name='tags'
                            type='text'
                            placeholder='Add #tags'
                            style={
                                fieldError.name === 'tags'
                                    ? { borderBottom: '2px solid red' }
                                    : { borderBottom: '' }
                            }
                        />
                    </div>
                </div>

                <div
                    ref={textRef}
                    data-element={'text'}
                    className={styles.editor}
                    style={
                        fieldError.name === 'text'
                            ? { border: '1px solid red', borderRadius: '5px' }
                            : { border: '1px solid #cfd4d9' }
                    }>
                    <SimpleEditor resetError={errorReset} />
                </div>
                <div className={styles.buttons}>
                    <Button text={'Submit'} type={'submit'} loading={isLoading ? true : false} />
                    <Link to={'/'} className={styles.cancel}>
                        <span>Cancel</span>
                    </Link>
                </div>
            </form>
            {fieldError.error && (
                <div className={styles.fieldError}>
                    <ValidateErrorMessage message={`${fieldError.name}: ${fieldError.error}`} />
                </div>
            )}
        </section>
    );
};
export default CreatePost;
