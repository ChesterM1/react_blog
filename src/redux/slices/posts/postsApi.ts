import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../utils/axios/axiosBaseQuery';
import store from '../../store';
import { AddCommentInterface, CommentInterface, ReactionCommentPayload } from './commentTypes';
import {
    CreatePostDataResponse,
    LikePostAction,
    Post,
    EditPostPayload,
    GetAllPostResponse,
    getAllPostParams,
    TagsResponse,
} from './postTypes';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Posts', 'Comment'],
    endpoints: (builder) => ({
        getPosts: builder.query<GetAllPostResponse, getAllPostParams>({
            query: (queryParams) => ({
                url: `posts`,
                params: {
                    ...queryParams,
                },
            }),
            providesTags: (result) =>
                result?.data
                    ? result?.data.map(({ _id }) => ({ type: 'Posts', id: _id }))
                    : ['Posts'],
        }),
        likePost: builder.mutation<Post, LikePostAction>({
            query: ({ postId, userId }) => ({
                url: `posts/like`,
                method: 'POST',
                data: { userId, postId },
            }),
            async onQueryStarted({ postId }, { queryFulfilled, dispatch }) {
                const { getPostCount, popularPost, activeTags } = store.getState().getPostQuery;
                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getPosts',
                        { limit: getPostCount, popular: popularPost, activeTags },
                        (draft: GetAllPostResponse) => {
                            const mutationPost = draft?.data.find((post) => post._id === postId);
                            if (mutationPost) {
                                mutationPost.like = {
                                    isLiked: true,
                                    likeCount: mutationPost?.like.likeCount + 1,
                                };
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('getOnePost', postId, (draft) => {
                        if (!draft.like.isLiked) {
                            draft.like = { isLiked: true, likeCount: draft.like.likeCount + 1 };
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
        unLikePost: builder.mutation<Post, LikePostAction>({
            query: ({ postId, userId }) => ({
                url: `posts/unLike`,
                method: 'POST',
                data: { userId, postId },
            }),
            async onQueryStarted({ postId }, { queryFulfilled, dispatch }) {
                const { getPostCount, popularPost, activeTags } = store.getState().getPostQuery;
                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getPosts',
                        { limit: getPostCount, popular: popularPost, activeTags },
                        (draft: GetAllPostResponse) => {
                            const mutationPost = draft?.data.find((post) => post._id === postId);
                            if (mutationPost) {
                                mutationPost.like = {
                                    isLiked: false,
                                    likeCount: mutationPost?.like.likeCount - 1,
                                };
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('getOnePost', postId, (draft) => {
                        if (draft.like.isLiked) {
                            draft.like = { isLiked: false, likeCount: draft.like.likeCount - 1 };
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
        getTags: builder.query<TagsResponse[], number>({
            query: (limit) => ({
                url: 'tags',
                params: {
                    limit,
                },
            }),
        }),
        getComment: builder.query<CommentInterface[], string>({
            query: (postId) => ({
                url: `comment/${postId}`,
            }),
            providesTags: ['Comment'],
            // (result) =>
            // result
            //     ? result?.map((item: CommentInterface) => ({ type: 'Comment', id: item._id }))
            //     : ['Comment'],
        }),
        addComment: builder.mutation<CommentInterface, AddCommentInterface>({
            query: (params) => ({
                url: 'comment',
                method: 'POST',
                data: { ...params },
            }),
            async onQueryStarted({ postId }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getPosts',
                        { limit: 3, popular: 1 },
                        (draft: GetAllPostResponse) => {
                            const post = draft.data.find((item) => item._id === postId);
                            if (post) {
                                post.comment = post.comment + 1;
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('getOnePost', postId, (draft) => {
                        if (draft) {
                            draft.comment = draft.comment + 1;
                        }
                    })
                );
                const response = await queryFulfilled;
                if (response.meta) {
                    patchResult.undo();
                    patchResultOne.undo();
                }
            },
            invalidatesTags: ['Comment'],
        }),
        removeComment: builder.mutation<void, { id: string; postId: string }>({
            query: ({ id }) => ({
                url: `comment/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ postId }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getPosts',
                        { limit: 3, popular: 1 },
                        (draft: GetAllPostResponse) => {
                            const post = draft.data.find((item) => item._id === postId);
                            if (post) {
                                post.comment = post.comment - 1;
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('getOnePost', postId, (draft) => {
                        if (draft) {
                            draft.comment = draft.comment - 1;
                        }
                    })
                );
                const response = await queryFulfilled;
                if (response.meta) {
                    patchResult.undo();
                    patchResultOne.undo();
                }
            },
            invalidatesTags: ['Comment'],
        }),
        lastComment: builder.query<CommentInterface[], number>({
            query: (limit) => ({
                url: `comment`,
                params: {
                    limit,
                },
            }),
            providesTags: ['Comment'],
        }),

        likeComment: builder.mutation<void, ReactionCommentPayload>({
            query: (params) => ({
                url: 'comment/like',
                method: 'POST',
                data: { ...params },
            }),
            async onQueryStarted({ commentId, postId }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getComment',
                        postId,
                        (draft: CommentInterface[]) => {
                            const comment = draft.find((comment) => comment._id === commentId);
                            if (comment) {
                                comment.likedCount++;
                                comment.dislikeCount = comment.IsDisliked
                                    ? comment.dislikeCount - 1
                                    : comment.dislikeCount;
                                comment.isLiked = true;
                                comment.IsDisliked = false;
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('lastComment', 2, (draft) => {
                        const comment = draft.find((comment) => comment._id === commentId);
                        if (comment) {
                            comment.likedCount++;
                            comment.dislikeCount = comment.IsDisliked
                                ? comment.dislikeCount - 1
                                : comment.dislikeCount;
                            comment.isLiked = true;
                            comment.IsDisliked = false;
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

        removeLikeComment: builder.mutation<void, ReactionCommentPayload>({
            query: (params) => ({
                url: 'comment/removelike',
                method: 'POST',
                data: { ...params },
            }),
            async onQueryStarted({ commentId, postId }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getComment',
                        postId,
                        (draft: CommentInterface[]) => {
                            const comment = draft.find((comment) => comment._id === commentId);
                            if (comment) {
                                comment.isLiked = false;
                                comment.likedCount--;
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('lastComment', 2, (draft) => {
                        const comment = draft.find((comment) => comment._id === commentId);
                        if (comment) {
                            comment.isLiked = false;
                            comment.likedCount--;
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
        dislikeComment: builder.mutation<void, ReactionCommentPayload>({
            query: (params) => ({
                url: 'comment/dislike',
                method: 'POST',
                data: { ...params },
            }),
            async onQueryStarted({ commentId, postId }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getComment',
                        postId,
                        (draft: CommentInterface[]) => {
                            const comment = draft.find((comment) => comment._id === commentId);
                            if (comment) {
                                comment.dislikeCount++;
                                comment.likedCount = comment.likedCount
                                    ? comment.likedCount - 1
                                    : comment.likedCount;
                                comment.isLiked = false;
                                comment.IsDisliked = true;
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('lastComment', 2, (draft) => {
                        const comment = draft.find((comment) => comment._id === commentId);
                        if (comment) {
                            comment.dislikeCount++;
                            comment.likedCount = comment.likedCount
                                ? comment.likedCount - 1
                                : comment.likedCount;
                            comment.isLiked = false;
                            comment.IsDisliked = true;
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
        removeDislikeComment: builder.mutation<void, ReactionCommentPayload>({
            query: (params) => ({
                url: 'comment/removedislike',
                method: 'POST',
                data: { ...params },
            }),
            async onQueryStarted({ commentId, postId }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData(
                        'getComment',
                        postId,
                        (draft: CommentInterface[]) => {
                            const comment = draft.find((comment) => comment._id === commentId);
                            if (comment) {
                                comment.IsDisliked = false;
                                comment.dislikeCount--;
                            }
                        }
                    )
                );

                const patchResultOne = dispatch(
                    postsApi.util.updateQueryData('lastComment', 2, (draft) => {
                        const comment = draft.find((comment) => comment._id === commentId);
                        if (comment) {
                            comment.IsDisliked = false;
                            comment.dislikeCount--;
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
    }),
});

export const {
    useGetPostsQuery,
    useLikePostMutation,
    useUnLikePostMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useGetOnePostQuery,
    useEditPostMutation,
    useGetTagsQuery,
    useGetCommentQuery,
    useAddCommentMutation,
    useLastCommentQuery,
    useRemoveCommentMutation,
    useLikeCommentMutation,
    useRemoveLikeCommentMutation,
    useDislikeCommentMutation,
    useRemoveDislikeCommentMutation,
} = postsApi;
