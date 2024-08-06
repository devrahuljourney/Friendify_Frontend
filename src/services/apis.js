// socket.js
import { io } from "socket.io-client";




//const BASE_URL = "https://friendify-backend.vercel.app/api/v1"
//const socketUrl = "https://friendify-backend.vercel.app"
const BASE_URL = "http://localhost:4000/api/v1"
const socketUrl = "http://localhost:4000";



const socket = io(socketUrl,{
  transports: ["polling", "websocket"]
 });

export default socket;

export const endPoints = {
    
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGE_PASSWORD: BASE_URL + "/auth/changepassword"
}

export const profileEndpoints = {
    GETPROFILE : BASE_URL + "/profile/getprofile",
    CREATE_PROFILE : BASE_URL + "/profile/createprofile",
    DELETE_PROFILE : BASE_URL + "/profile/deleteprofile",
    FOLLOW_USER: (userId) => `${BASE_URL}/profile/follow/${userId}`,
    UNFOLLOW_USER : (userId) =>  `${BASE_URL}/profile/unfollow/${userId}`,
    GET_PROFILE_BY_ID : (userId) => `${BASE_URL}/profile/getprofilebyid/${userId}`,
    FOLLOW_SUGGESTIONS : BASE_URL + "/profile/followsuggestion"
}


export const postEndpoints = {
    CREATE_POST: `${BASE_URL}/post/createpost`,
    EDIT_POST: (postId) => `${BASE_URL}/post/editpost/${postId}`,
    DELETE_POST: (postId) => `${BASE_URL}/post/deletepost/${postId}`,
    GET_FEED_FROM_FOLLOWER: `${BASE_URL}/post/getfeedfromfollower`,
    GET_ALL_POSTS_FROM_USER: (userId) => `${BASE_URL}/post/getallpost/${userId}`,
    GET_POST: (postId) => `${BASE_URL}/post/getpost/${postId}`,
    GET_FEED_FROM_ALL_USERS: `${BASE_URL}/post/getfeedfromalluser`,
  };

  export const commentEndpoints = {
    CREATE_COMMENT: (postId) => `${BASE_URL}/comment/createcomment/${postId}`,
    DELETE_COMMENT: (commentId) => `${BASE_URL}/comment/deletecomment/${commentId}`,
  };

  export const likeEndpoints = {
    CREATE_LIKE: (postId) => `${BASE_URL}/like/createlike/${postId}`,
    DELETE_LIKE: (likeId) => `${BASE_URL}/like/deletelike/${likeId}`,
  };

  export const searchEndpoints = {
    SEARCH : (keyword) => `${BASE_URL}/search/search?keyword=${keyword}`
  }

  export const conversionEndpoints = {
    SEND_MESSAGE : `${BASE_URL}/message/send-message`,
    GET_MESSAGE :(senderId,receiverId) => `${BASE_URL}/message/get-message/${senderId}/${receiverId}`,
    GET_MESSAGED_USER :(senderId) => `${BASE_URL}/message/get-messaged-user/${senderId}`
  }