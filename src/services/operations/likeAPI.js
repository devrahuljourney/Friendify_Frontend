import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { likeEndpoints } from "../apis";

const { CREATE_LIKE, DELETE_LIKE } = likeEndpoints;

// Define the base URL for the API
const BASE_URL = "http://localhost:4000/api/v1"

// Function to create a like for a post
export const createLike = async (postId, token) => {
    try {
        const url = `${BASE_URL}/like/createlike/${postId}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log("CREATE Like API RESPONSE ", data);

        if (!data.success) {
            throw new Error("Could not create like");
        }

        toast.success("Like Added Successfully");
    } catch (error) {
        console.log("CREATE LIKE API ERROR:", error);
        toast.error(error.message);
    }
};

// Function to delete a like for a post
export const deleteLike = async (likeId, token) => {
    try {
        const url = `${BASE_URL}/like/deletelike/${likeId}`;
        
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log("DELETE Like API RESPONSE ", data);

        if (!data.success) {
            throw new Error("Could not delete like");
        }

        toast.success("Like Deleted Successfully");
    } catch (error) {
        console.log("DELETE LIKE API ERROR:", error);
        toast.error(error.message);
    }
};
