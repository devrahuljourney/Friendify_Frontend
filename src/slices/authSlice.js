import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  loggedIn: false
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload; 
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLogin(state,action) {
        state.loggedIn = action.payload;
    }
  },
});

export const { setSignupData, setLoading, setToken, setLogin } = authSlice.actions;
export default authSlice.reducer;
