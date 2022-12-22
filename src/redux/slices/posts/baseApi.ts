import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../utils/axios/axiosBaseQuery';
import { CommentInterface } from './commentTypes';
import { Post, GetAllPostResponse, getAllPostParams, TagsResponse } from './Types';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Posts', 'Comment'],
    endpoints: (builder) => ({
        getPosts: builder.query<GetAllPostResponse, getAllPostParams>({
            query: (queryParams) => ({
                url: queryParams.popular === 0 ? `posts/last` : 'posts/popular',
                params: {
                    ...queryParams,
                },
            }),
            providesTags: (result) =>
                result?.data
                    ? result?.data.map(({ _id }) => ({ type: 'Posts', id: _id }))
                    : ['Posts'],
        }),

        getOnePost: builder.query<Post, string>({
            query: (postId) => ({
                url: `posts/${postId}`,
            }),
            providesTags: (result, err, id) => [{ type: 'Posts', id: id }],
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
    }),
});

export const { useGetPostsQuery, useGetTagsQuery, useGetCommentQuery, useLastCommentQuery } =
    baseApi;
