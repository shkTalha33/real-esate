/* eslint-disable no-throw-literal */

import imageCompression from "browser-image-compression";
import { isValidFileType } from "./isValidType";
import { fileUpload } from "./apiEndpoints";
import { axiosInstance } from "./axiosInstance";
// import { imageUpload } from "./ApiRoutesFile";

const header = {
  "Content-Type": "multipart/form-data",
};

export const uploadFile = async ({ file, video = false }) => {
  try {
    const validExtensions = ["jpg", "png", "jpeg", "mp4"];
    const check = isValidFileType(file, validExtensions);
    if (!check) {
      throw {
        message:
          "!Invalid file type. Please upload a valid image or PDF file. You can only select jpg, jpeg, png, mp4",
      };
    }

    const formData = new FormData();
    formData.append("file", file);
    const apiUrl = fileUpload;
    const response = await axiosInstance.post(apiUrl, formData, {
      headers: header,
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
