import axios from "axios";
import {create} from "zustand";
import {toast} from "react-hot-toast"
const baseURL = import.meta.env.VITE_API_BASE_URL;

// 🔌 Axios = the cable that connects your frontend and backend to exchange data.
// 🔐 CORS = the security guard that checks if the connection is allowed

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async(credentials) => {
        set({isSigningUp: true})
        try{
            const response = await axios.post(`${baseURL}/api/v1/auth/signup`, credentials, { withCredentials: true });
            console.log("response", response);
            set({user: response.data.user, isSigningUp: false});
            toast.success("Account created successfully");
        }
        catch(error){
            toast.error(error.response.data.message || "Signn failed");
            set({user: null, isSigningUp: false});
        }
    },
    login: async(credentials) => {
        set({isLoggingIn: true})
        try{
            const response = await axios.post(`${baseURL}/api/v1/auth/login`, credentials, {withCredentials: true});
            console.log("response", response);
            set({user: response.data.user, isLoggingIn: false});
            toast.success("Logged in successfullty");
        }
        catch(error){
            toast.error(error.response.data.message || "Login failed");
            set({user: null, isLoggingIn: false});
        }
    },
    logout: async() => { 
        set({isLoggingOut: true}); 
        try{
            // axios.post(url, data, config)
            const response = await axios.post(`${baseURL}/api/v1/auth/logout`, {}, {withCredentials: true});
            console.log("Response", response);
            localStorage.removeItem("user");
            set({user: null, isLoggingOut: false});
            toast.success("Logged out Successfully")
        }
        catch(error){
            toast.error(error.response.data.message || "Logout failed");
            set({user:null, isLoggingOut: false})
        }
    },
    authCheck: async() => {
        set({isCheckingAuth: true});
        try{
            // console.log("yehi hu bcc")
            const response = await axios.get(`${baseURL}/api/v1/auth/authCheck`, { withCredentials: true });
            console.log("response...", response)
            set({isCheckingAuth: false, user: response.data.user})
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        catch(error){
            localStorage.removeItem("user"); // ✅ Clear stale data
            set({ isCheckingAuth: false, user: null });
        }
    }
}))