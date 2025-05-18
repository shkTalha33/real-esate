import toast from "react-hot-toast";

export const handleError = (err) => {
  let error = "An unexpected error occurred";

  if (err.response) {
    switch (err.response.status) {
      case 400:
        error = err?.response?.data?.message;
        break;
      case 401:
        error = err?.response?.data?.message;
        break;
      case 402:
        error = err?.response?.data?.message;
        break;
      case 403:
        error = err?.response?.data?.message;
        break;
      case 404:
        error = err?.response?.data?.message;
        break;
      case 500:
        error = "Internal Server Error: Please try again later";
        break;
      case 501:
        error = err?.response?.data?.message;
        break;
      case 502:
        error = err?.response?.data?.message;
        break;
      case 503:
        error = "Service Unavailable: Please try again later";
        break;
      case 504:
        error = "Gateway Timeout: Please try again later";
        break;
      default:
        error = err?.response?.data?.message;
    }
  } else if (err.message) {
    error = err.message;
  }
  toast.error(error);
};
