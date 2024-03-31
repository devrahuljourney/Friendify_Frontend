import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { likeEndpoints } from "../apis";

const { CREATE_LIKE , DELETE_LIKE } = likeEndpoints;

export const createLike = async (postId, token ) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST" , CREATE_LIKE(postId) , {
            "content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        })

        console.log("CREATE Like API RESPONSE ", response);
        if(!response.data.success){
            throw new Error("Could not create like")
        }

        toast.success("Like Added Successfully");
    } catch (error) {
        console.log("CREATE LIKE API ERROR:", error);
        toast.error(error.message);
    }
}