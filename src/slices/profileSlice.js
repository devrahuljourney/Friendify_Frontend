import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :null,
    loading: false,
    dark: localStorage.getItem("dark") ? JSON.parse(localStorage.getItem("dark")) : false
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
          setDark(state, action) {
            state.dark = action.payload;
          }
    },
});

export const {setUser, setLoading, setDark} = profileSlice.actions;
export default profileSlice.reducer;