export interface AddCommentInterface {
    userId: string;
    postId: string;
    text: string;
}
export interface User {
    _id: string;
    fullName: string;
    createdAt: string;
}
export interface CommentInterface {
    user: User;
    postId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    _id: string;
}
