import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getLocalStorage } from '../../../utils/serviceLocalStorage';
import { RootState } from '../../store';
import { CreatePostDataResponse, LikePostAction, Post } from './postTypes';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://node-blog-api2.herokuapp.com/', //https://node-blog-api2.herokuapp.com/  //http://localhost:4444/
        prepareHeaders: (headers: Headers, { getState }) => {
            const token =
                (getState() as RootState).auth.user.token || getLocalStorage('user')?.token;
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], string>({
            query: () => ({
                url: 'posts',
            }),
            providesTags: ['Posts'],
        }),
        likePost: builder.mutation<Post, LikePostAction>({
            query: ({ postId, userId }) => ({
                url: `posts/like/${postId}`,
                method: 'POST',
                body: { userId, postId },
            }),
            async onQueryStarted({ postId, userId }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData('getPosts', '', (draft) => {
                        console.log(postId, draft);

                        const mutationPost = draft.find((post) => post._id === postId);
                        const likeInPost = mutationPost?.like.find((id) => id === userId);
                        if (mutationPost && likeInPost) {
                            mutationPost.like = mutationPost.like.filter((id) => id !== userId);
                        } else {
                            mutationPost?.like.push(userId);
                        }
                    })
                );

                try {
                    await queryFulfilled;
                } catch (e) {
                    patchResult.undo();
                }
            },
        }),
        createPost: builder.mutation<CreatePostDataResponse, FormData>({
            query: (formData) => ({
                url: 'posts/',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Posts'],
        }),
        deletePost: builder.mutation<Post, string>({
            query: (postId) => ({
                url: `posts/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts'],
        }),
        getOnePost: builder.query<Post, string>({
            query: (postId) => ({
                url: `posts/${postId}`,
            }),
        }),
    }),
});

export const {
    useGetPostsQuery,
    useLikePostMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useGetOnePostQuery,
} = postsApi;
