import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likes: [],
    loading: false,
};

const likeSlice = createSlice({
    name: "like",
    initialState: initialState,
    reducers: {
        addLike(state, action) {
            state.likes.push(action.payload);
        },
        removeLike(state, action) {
            state.likes = state.likes.filter((like) => like.id !== action.payload);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setLike(state,action){
            state.likes = action.payload;
        }
    },
});

export const { addLike, setLoading, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
