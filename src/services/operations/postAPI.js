import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { postEndpoints } from "../apis";
import { setPosts } from "../../slices/postSlice";
import { useDispatch } from "react-redux";

const {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    GET_FEED_FROM_FOLLOWER,
    GET_ALL_POSTS_FROM_USER,
    GET_POST,
    GET_FEED_FROM_ALL_USERS,
} = postEndpoints;


export const createPost = async(data, token) => {
    let result = null;
    const dispatch = useDispatch();
    const toastId = toast.loading("Loading...");
    try {
        const Response = await apiconnector("POST", CREATE_POST , data, {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
        })

        console.log("CREATE POST API RESPONSE ", Response);
        if(!Response?.data?.success){
            throw new Error("Could not create post");
            

        }

        toast.success("Post Uploaded Successfully");
        result = Response?.data?.post;
        dispatch(setPosts(result))
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}

export const editPost = async (postId, postData, token) => {
    let result = null;
    const dispatch = useDispatch();
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
        dispatch(setPosts(result));
    } catch (error) {
        console.log("EDIT POST API ERROR:", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};