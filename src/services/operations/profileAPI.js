import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

const { GETPROFILE, GET_PROFILE_BY_ID, CREATE_PROFILE, DELETE_PROFILE, FOLLOW_USER, UNFOLLOW_USER } = profileEndpoints;

// Function to fetch user profile
export const fetchProfile = async (token) => {
    let result = null;
    const toastId = toast.loading("Loading profile...");
    console.log("TOKEN :", token);
    try {
        const response = await fetch(GETPROFILE, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("GET PROFILE API RESPONSE ", response);

        // Check if response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }

        // Parse response body as JSON
        const responseData = await response.json();

        toast.success("Profile retrieved successfully");
        result = responseData.profile;
        return result;
    } catch (error) {
        console.log("GET PROFILE API ERROR:", error);
        toast.error(error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


export const fetchProfileById = async (userId,token) => {
    let result = null;
    const toastId = toast.loading("Loading profile...");
    console.log("USER ID ", userId)
    console.log("TOKEN :", token);
    try {
        const response = await fetch(GET_PROFILE_BY_ID(userId), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("GET PROFILE API BY ID RESPONSE ", response);

        // Check if response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }

        // Parse response body as JSON
        const responseData = await response.json();

        toast.success("Profile retrieved successfully");
        result = responseData.profile;
        return result;
    } catch (error) {
        console.log("GET PROFILE BY ID API ERROR:", error);
        toast.error(error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


// Function to create user profile
export const createNewProfile = async (profileData, token) => {
    let result = null;
    const toastId = toast.loading("Creating profile...");
    try {
        const response = await apiconnector("POST", CREATE_PROFILE, profileData, {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        });

        console.log("CREATE PROFILE API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not create profile");
        }

        toast.success("Profile created successfully");
        result = response?.data?.profile;
        return result;
    } catch (error) {
        console.log("CREATE PROFILE API ERROR:", error);
        toast.error(error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};

// Function to delete user profile
export const removeProfile = async (token) => {
    const toastId = toast.loading("Deleting profile...");
    try {
        const response = await apiconnector("DELETE", DELETE_PROFILE, null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("DELETE PROFILE API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not delete profile");
        }

        toast.success("Profile deleted successfully");
        return true;
    } catch (error) {
        console.log("DELETE PROFILE API ERROR:", error);
        toast.error(error.message);
        return false;
    } finally {
        toast.dismiss(toastId);
    }
};

// Function to follow a user
export const followSelectedUser = async (userId, token) => {
    const toastId = toast.loading("Following user...");
    try {
        const response = await apiconnector("POST", FOLLOW_USER(userId), null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("FOLLOW USER API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not follow user");
        }

        toast.success("User followed successfully");
        return true;
    } catch (error) {
        console.log("FOLLOW USER API ERROR:", error);
        toast.error(error.response.data.message);
        return false;
    } finally {
        toast.dismiss(toastId);
    }
};

// Function to unfollow a user
export const unfollowSelectedUser = async (userId, token) => {
    const toastId = toast.loading("Unfollowing user...");
    try {
        const response = await apiconnector("POST", UNFOLLOW_USER(userId), null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("UNFOLLOW USER API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not unfollow user");
        }

        toast.success("User unfollowed successfully");
        return true;
    } catch (error) {
        console.log("UNFOLLOW USER API ERROR:", error);
        toast.error(error.message);
        return false;
    } finally {
        toast.dismiss(toastId);
    }
};
