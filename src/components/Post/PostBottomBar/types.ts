import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { LikePostAction, Post } from '../../../redux/slices/posts/postTypes';

interface FetchProps {
    viewCount: number;
    createdAt: string;
    addLike?: () => MutationActionCreatorResult<
        MutationDefinition<
            LikePostAction,
            BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
            'Posts',
            Post,
            'postsApi'
        >
    >;

    handleLIKE?: string[];
}
export interface BottomBarPropsInterface {
    comment?: boolean;
    view: boolean;
    like?: boolean;
    props: FetchProps;
    scrollToComment?: () => void;
}
