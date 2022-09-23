import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios/axios';
import { InitialState, LikePostAction, Post } from './postTypes';
import { LoadStatus } from '../loadStatusTypes';

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetching', async () => {
    const { data } = await axios.get('posts');

    return data as Post[];
});

const initialState: InitialState = {
    allPosts: [],
    status: LoadStatus.LOADING,
};

export const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        likePost(state, action: PayloadAction<LikePostAction>) {
            const { userId, postId } = action.payload;
            const findPost = state.allPosts.find((elem) => elem._id === postId);
            const findLike = findPost?.like.find((item) => item === userId);

            if (findLike && findPost) {
                findPost.like = findPost.like.filter((item) => item !== userId);
                console.log();
            } else {
                findPost?.like.push(userId);
            }
            axios
                .post(`posts/like/${postId}`, { userId })
                .catch((err) => console.log(err, '[likePost] ERROR'));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = LoadStatus.LOADING;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.allPosts = action.payload;
            state.status = LoadStatus.IDLE;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.status = LoadStatus.ERROR;
            state.allPosts = [];
        });
    },
});
export const { likePost } = posts.actions;

export default posts.reducer;
