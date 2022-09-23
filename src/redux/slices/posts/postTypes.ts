import { LoadStatus } from '../loadStatusTypes';

interface User {
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    avatar?: string;
}

export interface Post {
    _id: string;
    title: string;
    text: string;
    tags: string[];
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    like: string[];
    user: User;
}
export interface PostsInterface {
    allPosts: Post[];
}

export interface InitialState {
    allPosts: Post[] | [];
    status: LoadStatus.LOADING | LoadStatus.IDLE | LoadStatus.ERROR;
}

export interface LikePostAction {
    userId: string;
    postId: string;
}
