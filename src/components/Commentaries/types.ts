import { CommentInterface } from '../../redux/slices/posts/commentTypes';
export interface ActionComment {
    remove?: (postId: string, commentId: string) => void;
    edit?: (text: string, commentId: string) => void;
}

export interface CommentariesProps {
    props: CommentInterface & ActionComment;
    edit?: boolean;
    redirect?: boolean;
}
