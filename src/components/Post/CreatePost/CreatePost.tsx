import styles from './createPost.module.scss';
import { FormEvent, useRef, useState } from 'react';
import Button from '../../Button/Button';
import ImgSkeleton from './ImgSkeleton';
import { Link } from 'react-router-dom';
import SimpleEditor from '../SimpleEditor/SimpleEditor';

const CreatePost = () => {
    const [blobLinkImg, setBlobLinkImg] = useState<string>('');
    const [inputValueImg, setInputValueImg] = useState<string>('');
    const fileImgRef = useRef<HTMLInputElement>(null);

    const triggeredInput = () => {
        if (fileImgRef && fileImgRef.current) {
            fileImgRef.current.click();
        }
    };

    const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            setBlobLinkImg(url);
        }
        setInputValueImg(e.target.value);
    };

    const resetImgLink = () => {
        if (window.confirm('Remove this image?')) {
            setBlobLinkImg('');
            setInputValueImg('');
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
    };
    return (
        <section className={styles.create}>
            <form onSubmit={submit}>
                <div className={styles.head}>
                    <div className={styles.imgBlock}>
                        {blobLinkImg ? (
                            <div className={styles.img}>
                                <img
                                    // src='https://www.freeiconspng.com/uploads/download-bmw-car-png-image-0.png'
                                    src={blobLinkImg}
                                    alt='post img'
                                />
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
                                name='img'
                            />
                            <Button loading={false} text={'Upload img'} />
                        </div>
                    </div>
                    <div className={styles.titleBlock}>
                        <input type='text' name='title' placeholder='Enter the title' />
                        <input type='text' name='tags' placeholder='Add #tags' />
                    </div>
                </div>

                <div className={styles.editor}>
                    <SimpleEditor />
                </div>
                <div className={styles.buttons}>
                    <Button text={'Submit'} type={'submit'} loading={false} />
                    <Link to={'/'} className={styles.cancel}>
                        <span>Cancel</span>
                    </Link>
                </div>
            </form>
        </section>
    );
};
export default CreatePost;
