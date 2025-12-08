// Updated axiosInstance.js - With request deduplication
import axios from "axios";
import Cookies from "js-cookie";

const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Map to store pending GET requests to prevent duplicates
const pendingRequests = new Map();

// Request interceptor - add token to requests
baseAxios.interceptors.request.use(
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

// Create a wrapper for axios instance with deduplication for GET requests
export const axiosInstance = {
  ...baseAxios,
  
  get: (url, config = {}) => {
    const requestKey = `GET-${url}`;
    
    // If this exact GET request is already pending, return the existing promise
    if (pendingRequests.has(requestKey)) {
      return pendingRequests.get(requestKey);
    }
    
    // Create a new request promise
    const requestPromise = baseAxios.get(url, config)
      .then((response) => {
        // Clean up the pending request after it completes
        pendingRequests.delete(requestKey);
        return response;
      })
      .catch((error) => {
        // Clean up the pending request on error
        pendingRequests.delete(requestKey);
        throw error;
      });
    
    // Store the promise for potential duplicate requests
    pendingRequests.set(requestKey, requestPromise);
    
    return requestPromise;
  },
  
  // For POST, PUT, DELETE - use the base axios without deduplication
  post: (url, data, config) => baseAxios.post(url, data, config),
  put: (url, data, config) => baseAxios.put(url, data, config),
  delete: (url, config) => baseAxios.delete(url, config),
  patch: (url, data, config) => baseAxios.patch(url, data, config),
};