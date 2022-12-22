import store from '../../store';
import { baseApi } from './baseApi';
import {
    Post,
    LikePostAction,
    GetAllPostResponse,
    CreatePostDataResponse,
    EditPostPayload,
} from './Types';

const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        likePost: builder.mutation<Post, LikePostAction>({
            query: ({ postId, userId }) => ({
                url: `posts/like`,
                method: 'POST',
                data: { userId, postId },
            }),
            async onQueryStarted({ postId }, { queryFulfilled, dispatch }) {
                const { getPostCount, popularPost, activeTags } = store.getState().getPostQuery;

                const patchResult = dispatch(
                    baseApi.util.updateQueryData(
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
                    baseApi.util.updateQueryData('getOnePost', postId, (draft) => {
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
                    baseApi.util.updateQueryData(
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
                    baseApi.util.updateQueryData('getOnePost', postId, (draft) => {
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
            invalidatesTags: ['Posts', 'Comment'],
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
    useLikePostMutation,
    useUnLikePostMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useGetOnePostQuery,
    useEditPostMutation,
} = postsApi;
