import { CommentInterface } from '../../redux/slices/posts/commentTypes';

export interface CommentariesProps {
    props: CommentInterface;
    edit?: boolean;
    redirect?: boolean;
}
