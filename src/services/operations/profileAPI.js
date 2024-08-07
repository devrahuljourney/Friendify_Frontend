import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { setProfileData } from "../../slices/profileSlice";

const { GETPROFILE, GET_PROFILE_BY_ID, CREATE_PROFILE, DELETE_PROFILE, FOLLOW_USER, UNFOLLOW_USER, FOLLOW_SUGGESTIONS } = profileEndpoints;

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
        // toast.error(error.response.data.message);
        toast.error(error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


export const fetchProfileById = async (userId, token) => {
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
        console.log("Response data from FETCH PROFILE BY ID ", responseData);

        toast.success("Profile retrieved successfully");
        
        const result = responseData.profile;
        console.log("result ", result);

        return result;
    } catch (error) {
        console.log("GET PROFILE BY ID API ERROR:", error);
        // toast.error(error.response.data.message);
        toast.error(error.message);
        return null;
    }
};

export const followSuggestions = async (token) => {
    try {
        const response = await fetch(FOLLOW_SUGGESTIONS, {
            method:"GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log("GET  FOLLOW SUGGESTIONS API RESPONSE ", response);

        // Check if response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch follow suggestion");
        }

        // Parse response body as JSON
        const responseData = await response.json();
        console.log("Response data from FETCH FOLLOW SUGGESTIONS API ", responseData);

        toast.success("Follow suggestions retrieved successfully");
        
        const result = responseData.suggestions;
        console.log("result ", result);

        return result;
    } catch (error) {
        console.log("GET FOLLOW SUGGESTIONS API ERROR:", error);
        // toast.error(error.response.data.message);
        toast.error(error.message);
        return null;
    }
}


// Function to create user profile
export const createNewProfile = async (profileData, token) => {
    let result = null;
    const toastId = toast.loading("Creating profile...");
    try {
        const response = await apiconnector("POST", CREATE_PROFILE, profileData, {
            "Content-Type": "multipart/form-data",
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
        toast.error(error.response.data.message);
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
        toast.error(error.response.data.message);
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
        toast.error(error.response.data.message);
        toast.error(error.message);
        return false;
    } finally {
        toast.dismiss(toastId);
    }
};
