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
    imageUrl?: string;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    like: string[];
    user: User;
}
export interface CreatePostArg {
    image: File;
    text: string;
    title: string;
    tags: string;
}

export interface LikePostAction {
    userId: string;
    postId: string;
}

export interface CreatePostDataResponse {
    post: Post;
}

export interface EditPostPayload {
    formData: FormData;
    postId: string;
}
