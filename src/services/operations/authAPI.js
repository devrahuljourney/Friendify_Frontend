import toast from "react-hot-toast";
import { setLoading, setToken, setLogin } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { endPoints } from "../apis";
import { apiconnector } from "../apiconnector"


const {SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,} = endPoints;

export function sendOtp (email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try {
            const response = await apiconnector("POST" , SENDOTP_API, {
                email,
                checkUserPresent:true
            } ) 

            console.log("SENDOTP API RESPONSE............", response)

             console.log(response.data.success)

             if (!response.data.success) {
               throw new Error(response.data.message)
            }

                toast.success("OTP Sent Successfully")
                 navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error(error.response.data.message);
            toast.error("Could Not Send OTP")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp ({firstname, lastname, email, password,confirmPassword, otp, navigate})
{
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        console.log(firstname , lastname, email, password, confirmPassword, otp)
        try {
            
            const response = await apiconnector("POST", SIGNUP_API, {
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
                otp
            } )


            console.log("SIGNUP API RESPONSE ", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
              toast.success("Signup Successful")
              navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error(error.response.data.message);
            toast.error("Signup Failed")
            navigate("/signup")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function login(email,password,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiconnector("POST", LOGIN_API, {email,password});

            console.log("LOGIN API RESPONSE ", response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            dispatch(setLogin(true));

            dispatch(setUser({...response.data.existingUser}));
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.existingUser
                ))
            localStorage.setItem("loggedIn", JSON.stringify("true"))

            navigate("/")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            // toast.error(error.response.data.message);
            toast.error("Login Failed")   
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

    
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("loggedIn")
      toast.success("Logged Out")
      navigate("/login")
    }
  }
  