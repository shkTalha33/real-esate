// auth endpoints
const login = "users/signin";
const signup = "users/signup";
const googleEndpoint = "users/auth/google";
const githubEndpoint = "users/auth/github";
const currentUser = "users/current-user";

// profile endpoints
const updateProfile = "users/update-profile";
const updateAvatar = "users/update-avatar";
const changePassword = "users/change-password";

// image upload endpoint
const fileUpload = "file/upload";

export {
  login,
  signup,
  googleEndpoint,
  githubEndpoint,
  currentUser,
  updateProfile,
  updateAvatar,
  changePassword,
  fileUpload,
};
