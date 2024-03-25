import {createSlice} from "@reduxjs/toolkit"
//localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :
const initialState = {
    user:  null,
    loading: false,
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
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;