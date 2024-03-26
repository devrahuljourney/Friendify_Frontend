import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { postEndpoints } from "../apis";

const {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    GET_FEED_FROM_FOLLOWER,
    GET_ALL_POSTS_FROM_USER,
    GET_POST,
    GET_FEED_FROM_ALL_USERS,
} = postEndpoints;