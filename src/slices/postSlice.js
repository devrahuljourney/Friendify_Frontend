import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        addPost(state, action) {
            state.posts.push(action.payload);
        },
        editPost(state, action) {
            const editedPost = action.payload;
            state.posts = state.posts.map((post) =>
                post.id === editedPost.id ? editedPost : post
            );
        },
        deletePost(state, action) {
            const postIdToDelete = action.payload;
            state.posts = state.posts.filter((post) => post.id !== postIdToDelete);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    setPosts,
    addPost,
    editPost,
    deletePost,
    setLoading,
    setError,
} = postSlice.actions;

export default postSlice.reducer;
