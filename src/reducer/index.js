import {combineReducers}  from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import commentSlice from '../slices/commentSlice';
import likeSlice from '../slices/likeSlice';
import postSlice from '../slices/postSlice';
import profileSlice from '../slices/profileSlice';


const rootReducer = combineReducers({
     auth:authReducer,
     comment:commentSlice,
     like:likeSlice,
     post:postSlice,
     profile:profileSlice
})

export default rootReducer;