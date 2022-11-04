import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../utils/axios/axiosBaseQuery';
import store from '../../store';
import {
    CreatePostDataResponse,
    LikePostAction,
    Post,
    EditPostPayload,
    GetAllPostResponse,
} from './postTypes';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query<GetAllPostResponse, number | void>({
            query: (limit) => ({
                url: `posts`,
                params: {
                    limit,
                },
            }),
            providesTags: (result) =>
                result?.data
                    ? result?.data.map(({ _id }) => ({ type: 'Posts', id: _id }))
                    : ['Posts'],
        }),
        likePost: builder.mutation<Post, LikePostAction>({
            query: ({ postId, userId }) => ({
                url: `posts/like/${postId}`,
                method: 'POST',
                data: { userId, postId },
            }),
            async onQueryStarted({ postId, userId }, { queryFulfilled, dispatch }) {
                const postLimit = store.getState().pagination.getPostCount;
                const test = store.getState();
                console.log(test);

                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getPosts',
                        postLimit,
                        (draft: GetAllPostResponse) => {
                            const mutationPost = draft?.data.find((post) => post._id === postId);
                            const likeInPost = mutationPost?.like.find((id) => id === userId);
                            if (mutationPost && likeInPost) {
                                mutationPost.like = mutationPost.like.filter((id) => id !== userId);
                            } else {
                                mutationPost?.like.push(userId);
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('getOnePost', postId, (draft) => {
                        const likeInPost = draft.like?.find((id) => id === userId);
                        if (likeInPost) {
                            draft.like = draft.like.filter((id) => id !== userId);
                        } else {
                            draft.like.push(userId);
                        }
                    })
                );

                const response = await queryFulfilled;
                if (response.meta) {
                    patchResult.undo();
                    patchResultOne.undo();
                }
            },
        }),
        createPost: builder.mutation<CreatePostDataResponse, FormData>({
            query: (formData) => ({
                url: 'posts/',
                method: 'POST',
                data: formData,
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
            providesTags: (result, err, id) => [{ type: 'Posts', id: id }],
        }),
        editPost: builder.mutation<CreatePostDataResponse, EditPostPayload>({
            query: ({ formData, postId }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                data: formData,
            }),
            invalidatesTags: ['Posts'],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useLikePostMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useGetOnePostQuery,
    useEditPostMutation,
} = postsApi;
