interface User {
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    avatar?: string;
}

export interface Like {
    isLiked: boolean;
    likeCount: number;
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
    comment: number;
    like: Like;
    user: User;
}

export interface GetAllPostResponse {
    data: Post[];
    sendPost: number;
    totalPost: number;
}

export interface getAllPostParams {
    limit: number;
    popular: number;
    activeTags?: string;
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

export interface TagsResponse {
    name: string;
    _id: string;
}
