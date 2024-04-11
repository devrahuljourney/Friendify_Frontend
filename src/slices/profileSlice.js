import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :null,
    loading: false,
    menu:false,
    dark: localStorage.getItem("dark") ? JSON.parse(localStorage.getItem("dark")) : false,
    profileData:null,
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
          },
          setMenu(state, value) {
            state.menu = value.payload
          },
          
        setProfileData (state, action) {
            state.profileData = action.payload;
        }
    },
});

export const {setUser, setMenu, setLoading, setDark, setProfileData} = profileSlice.actions;
export default profileSlice.reducer;