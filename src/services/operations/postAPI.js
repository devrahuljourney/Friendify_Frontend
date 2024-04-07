import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { postEndpoints } from "../apis";
import { setPosts, deletePost, addPost } from "../../slices/postSlice";

const {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    GET_FEED_FROM_FOLLOWER,
    GET_ALL_POSTS_FROM_USER,
    GET_POST,
    GET_FEED_FROM_ALL_USERS,
} = postEndpoints;

export const createPost = async (data, token, dispatch) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST", CREATE_POST, data, {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        });

        console.log("CREATE POST API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not create post");
        }

        toast.success("Post Uploaded Successfully");
        result = response?.data?.post;
        console.log("post result ", result)
        dispatch(setPosts(result));
    } catch (error) {
        console.log("CREATE POST API ERROR:", error)
        toast.error(error.response.data.message);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const editPost = async (postId, postData, token, dispatch) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST", EDIT_POST(postId), postData, {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        });

        console.log("EDIT POST API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not edit post");
        }

        toast.success("Post Edited Successfully");
        result = response?.data?.post;
        dispatch(addPost(result));
    } catch (error) {
        console.log("EDIT POST API ERROR:", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const deletePostAPI = async (postId, token, dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("DELETE", DELETE_POST(postId), {
            "Content-Type": "Applications/json",
            "Authorization": `Bearer ${token}`
        });

        console.log("DELETE POST API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not able to delete post");
        }

        toast.success("Post deleted Successfully");
        dispatch(deletePost(postId))
    } catch (error) {
        console.log("DELETE POST API ERROR:", error);
        toast.error(error.response.data.message);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
};

export const getPostById = async (postId, token) => {
    try {
        const response = await apiconnector("GET", GET_POST(postId), null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("GET POST BY ID API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch post by ID");
        }
        
        return response?.data?.post;
    } catch (error) {
        console.log("GET POST BY ID API ERROR:", error);
        toast.error(error.response.data.message);
        toast.error(error.message);
        return null;
    }
};

export const getFeedFromAllUsers = async (token) => {
    try {
        const response = await apiconnector("GET", GET_FEED_FROM_ALL_USERS, null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("GET FEED FROM ALL USERS API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch feed from all users");
        }
        console.log("post result ", response?.data?.posts)
        return response?.data?.posts;
    } catch (error) {
        console.log("GET FEED FROM ALL USERS API ERROR:", error);
        toast.error(error.message);
        return [];
    }
};

export const getFeedFromFollower = async (token) => {
    try {
        const response = await apiconnector("GET", GET_FEED_FROM_FOLLOWER, null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("GET FEED FROM FOLLOWER API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch feed from followers");
        }

        console.log("post result ", response?.data?.posts)
        return response?.data?.posts;
    } catch (error) {
        console.log("GET FEED FROM FOLLOWER API ERROR:", error);
        toast.error(error.message);
        return [];
    }
};

export const getAllPostsFromUser = async (userId, token) => {
    try {
        const response = await apiconnector("GET", GET_ALL_POSTS_FROM_USER(userId), null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("GET ALL POSTS FROM USER API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch all posts from user");
        }

        return response?.data?.posts;
    } catch (error) {
        console.log("GET ALL POSTS FROM USER API ERROR:", error);
        toast.error(error.message);
        return [];
    }
};
