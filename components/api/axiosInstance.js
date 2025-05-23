// Updated axiosInstance.js - Simple version
import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Request interceptor - add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    let token;
      // Try to get from cookies first
      token = Cookies.get("estate_loop_token");
      
      // If not in cookies, try localStorage as fallback
      if (!token) {
        token = localStorage.getItem("estate_loop_token");
        
        // If token exists in localStorage but not in cookies, set it in cookies too
        if (token) {
          Cookies.set("estate_loop_token", token, { expires: 1 });
        }
      }
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// No need to change response interceptor if you don't want to