import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { conversionEndpoints } from "../apis";
const { GET_MESSAGED_USER, GET_MESSAGE, SEND_MESSAGE } = conversionEndpoints




export const getMessegedUser = async (senderId, token) => {
    try {
        const response = await apiconnector("GET", GET_MESSAGED_USER(senderId), null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("GET POST BY ID API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch post by ID");
        }
        
        return response?.data?.user;
    } catch (error) {
        console.log("GET MESSEGED USER API ERROR:", error);
        toast.error(error.response.data.message);
        toast.error(error.message);
        return null;
    }
};

export const getMessage = async (senderId, receiverId, token) => {
    try {
        const response = await apiconnector("GET", GET_MESSAGE(senderId, receiverId), null, {
            "Authorization": `Bearer ${token}`
        });

        console.log("GET MESSAGE API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch messages");
        }
        
        return response?.data?.chat;
    } catch (error) {
        console.log("GET MESSAGE API ERROR:", error);
        toast.error(error.response.data.message);
        toast.error(error.message);
        return null;
    }
};

export const sendMessage = async(senderId, receiverId, message, token) => {
    try {
        const response = await apiconnector("POST", SEND_MESSAGE , {senderId, receiverId,message}, {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }  )

        console.log("SEND MESSAGE API RESPONSE ", response);
        if (!response?.data?.success) {
            throw new Error("Could not send messages");
        }
    } catch (error) {
        console.log("SEND MESSAGE API ERROR:", error);
        toast.error(error.response.data.message);
        toast.error(error.message);
    }
}