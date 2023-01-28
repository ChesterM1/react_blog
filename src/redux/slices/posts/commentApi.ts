import {
    AddCommentInterface,
    CommentInterface,
    editCommentPayload,
    ReactionCommentPayload,
} from './commentTypes';
import { baseApi } from './baseApi';

const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation<CommentInterface, AddCommentInterface>({
            query: (params) => ({
                url: 'comment',
                method: 'POST',
                data: { ...params },
            }),

            invalidatesTags: ['Comment'],
        }),
        removeComment: builder.mutation<void, { id: string; postId: string }>({
            query: ({ id }) => ({
                url: `comment/${id}`,
                method: 'DELETE',
            }),

            invalidatesTags: ['Comment'],
        }),

        likeComment: builder.mutation<void, ReactionCommentPayload>({
            query: (params) => ({
                url: 'comment/like',
                method: 'POST',
                data: { ...params },
            }),
            async onQueryStarted({ commentId, postId }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    baseApi.util.updateQueryData(
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
                    baseApi.util.updateQueryData('lastComment', 2, (draft) => {
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
                    baseApi.util.updateQueryData(
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
                    baseApi.util.updateQueryData('lastComment', 2, (draft) => {
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
                    baseApi.util.updateQueryData(
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
                    baseApi.util.updateQueryData('lastComment', 2, (draft) => {
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
                    baseApi.util.updateQueryData(
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
                    baseApi.util.updateQueryData('lastComment', 2, (draft) => {
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

        editComment: builder.mutation<CommentInterface, editCommentPayload>({
            query: (data) => ({
                url: `comment`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Comment'],
        }),
    }),
});

export const {
    useEditCommentMutation,
    useAddCommentMutation,
    useRemoveCommentMutation,
    useLikeCommentMutation,
    useRemoveLikeCommentMutation,
    useDislikeCommentMutation,
    useRemoveDislikeCommentMutation,
} = commentApi;
