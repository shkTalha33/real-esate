import { axiosInstance } from "./axiosInstance";
import { setLogout } from "@/redux/slices/loginSlice";
import { useRouter } from "next/navigation";
import { fileUpload } from "./apiEndpoints";

const ApiFunction = () => {
  const router = useRouter();
  // Define headers
  const header1 = {
    "Content-Type": "application/json",
  };

  const header2 = {
    "Content-Type": "multipart/form-data",
  };

  //logout fucntion
  const handleUserLogout = () => {
    dispatch(setLogout());
    router.replace("/login");
    toast.info("Your session is expire, please login");
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

  //DELETE request
  const deleteData = async (endpoint) => {
    const apiResponse = axiosInstance
      .post(endpoint, { headers: header1 })
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
