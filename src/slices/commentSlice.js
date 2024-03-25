import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    loading: false,
};

const commentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers: {
        addComment(state, action) {
            state.comments.push(action.payload);
        },
        removeComment(state, action) {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { addComment, setLoading, removeComment } = commentSlice.actions;
export default commentSlice.reducer;
