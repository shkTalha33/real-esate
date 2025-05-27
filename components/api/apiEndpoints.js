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

// listing endpoints
const createListing = "listing/add-listing";
const updateListing = "listings/update";
const deleteListing = "listings/delete";
const getListing = "listings/get";
const getListingById = "listings/getById";
const getListingByUserId = "listings/getByUserId";
const getAllListings = "listings/getAll";
const getFeaturedListings = "listings/getFeatured";
const getSoldListings = "listings/getSold";
const getRentedListings = "listings/getRented";
const getDeletedListings = "listings/getDeleted";

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
  createListing,
  updateListing,
  deleteListing,
  getListing,
  getListingById,
  getListingByUserId,
  getAllListings,
  getFeaturedListings,
  getSoldListings,
  getRentedListings,
  getDeletedListings,
};
