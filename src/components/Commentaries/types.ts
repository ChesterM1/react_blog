import { CommentInterface } from '../../redux/slices/posts/commentTypes';
interface actionComment {
    remove?: (postId: string, commentId: string) => void;
    edit?: (text: string, commentId: string) => void;
}

export interface CommentariesProps {
    props: CommentInterface & actionComment;
    edit?: boolean;
    redirect?: boolean;
}
