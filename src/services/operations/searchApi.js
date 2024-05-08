import toast from "react-hot-toast";
import { searchEndpoints } from "../apis";
import { apiconnector } from "../apiconnector";

const { SEARCH } = searchEndpoints;

export const searchByKeyword = async (keyword, token) => {
    console.log("Keyword from search api", keyword);
    console.log("Token from search api", token);
    try {
        const response = await fetch(SEARCH(keyword), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Parse JSON response
        const data = await response.json();

        console.log("GET SEARCH API RESPONSE ", data);

        // Check if request was successful
        if (!response.ok) {
            throw new Error("Could not search");
        }

        return data;
    } catch (error) {
        console.log("GET SEARCH API ERROR:", error);
        toast.error(error.message);
        return null;
    }
};
