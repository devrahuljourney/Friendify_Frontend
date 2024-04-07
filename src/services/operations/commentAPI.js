


import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { addComment } from "../../slices/commentSlice";
import { commentEndpoints } from "../apis";

const { CREATE_COMMENT, DELETE_COMMENT } = commentEndpoints;

export const createComment = async (postId, commentData, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        // Stringify only the comment data
        const comment = JSON.stringify(commentData);

        const response = await apiconnector("POST", CREATE_COMMENT(postId), {
            comment : commentData
        }, {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        });

        console.log("CREATE COMMENT API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not create comment");
        }

        toast.success("Comment Added Successfully");
        result = response?.data?.comment;
        return result;
    } catch (error) {
        console.log("CREATE COMMENT API ERROR:", error);
        toast.error(error.response.data.message);
        toast.error(error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};



export const deleteComment = async (commentId, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("DELETE", DELETE_COMMENT(commentId), null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("DELETE COMMENT API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not delete comment");
        }

        toast.success("Comment Deleted Successfully");
        return true;
    } catch (error) {
        console.log("DELETE COMMENT API ERROR:", error);
        toast.error(error.response.data.message);
        toast.error(error.message);
        return false;
    } finally {
        toast.dismiss(toastId);
    }
};
