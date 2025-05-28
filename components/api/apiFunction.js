import { axiosInstance } from "./axiosInstance";
import { setLogout } from "@/redux/slices/loginSlice";
import { useRouter } from "next/navigation";
import { fileUpload } from "./apiEndpoints";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const ApiFunction = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // Define headers
  const header1 = {
    "Content-Type": "application/json",
  };

  const header2 = {
    "Content-Type": "multipart/form-data",
  };

  //logout function - updated to clear cookies too
  const handleUserLogout = () => {
    // Clear localStorage
    localStorage.removeItem("estate_loop_token");

    // Also clear cookies
    Cookies.remove("estate_loop_token");

    // Update Redux state
    dispatch(setLogout());

    // Redirect
    router.replace("/login");
    toast.error("Your session has expired, please login");
  };

  // GET request
  const get = async (endpoint) => {
    const apiResponse = axiosInstance
      .get(endpoint, { headers: header1 })
      .then((response) => response?.data)
      .catch((error) => {
        console.error("Error in GET request:", error);
        if (error?.response?.status === 401) {
          handleUserLogout();
        }
        throw error;
      });

    return apiResponse;
  };

  //POST request
  const post = async (endpoint, apiData) => {
    const apiResponse = axiosInstance
      .post(endpoint, apiData, { headers: header1 })
      .then((response) => response?.data)
      .catch((error) => {
        console.error("Error in GET request:", error);
        if (error?.response?.status === 401) {
          handleUserLogout();
        }
        throw error;
      });

    return apiResponse;
  };

  //PUT request
  const put = async (endpoint, apiData) => {
    const apiResponse = axiosInstance
      .put(endpoint, apiData, { headers: header1 })
      .then((response) => response?.data)
      .catch((error) => {
        console.error("Error in GET request:", error);
        if (error?.response?.status === 401) {
          handleUserLogout();
        }
        throw error;
      });

    return apiResponse;
  };

  //DELETE request
  const deleteData = async (endpoint) => {
    const apiResponse = axiosInstance
      .delete(endpoint, { headers: header1 })
      .then((response) => response?.data)
      .catch((error) => {
        console.error("Error in GET request:", error);
        if (error?.response?.status === 401) {
          handleUserLogout();
        }
        throw error;
      });

    return apiResponse;
  };

  const uploadFile2 = async ({ data }) => {
    try {
      const res = await axiosInstance.post(fileUpload, data, {
        headers: {
          ...header2,
        },
      });
      return res?.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    deleteData,
    uploadFile2,
  };
};

export default ApiFunction;
