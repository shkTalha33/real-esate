// auth endpoints
const login = "users/signin";
const signup = "users/signup";
const googleEndpoint = "users/auth/google";
const githubEndpoint = "users/auth/github";
const currentUser = "users/current-user";

// profile endpoints
const updateProfile = "users/update-profile";
const updateAvatar = "users/update-avatar";
const updateDetails = "users/update-details";
const changePassword = "users/update-password";
const updateEmail = "users/update-email";
const updateUserName = "users/update-username";
const deactivateuser = "users/deactivate";
// contact endpoints
const contactPost = "contact/create";
// listing endpoints
const createListing = "listing/add-listing";
const updateListing = "listings/update";
const deleteListing = "listings/delete";
const getListing = "listing/get-listings";
const getListingById = "listings/getById";
const getListingByUserId = "listings/getByUserId";
const getAllListings = "listings/getAll";
const getFeaturedListings = "listing/featured-listings";
const getSoldListings = "listings/getSold";
const getRentedListings = "listings/getRented";
const getDeletedListings = "listings/getDeleted";
const getTopSellers = "users/best-sellers";
const getLatestProperties = "listing/latest-properties";
const getRecentlySoldProperties = "listing/recently-sold-properties";
const myListings = "listing/my-listings";
const propertyDetail = "listing/property-details";
const getRecommendedListings = "listing/recommended-listings";

// image upload endpoint
const fileUpload = "file/upload";

export {
  login,
  signup,
  deactivateuser,
  updateDetails,
  updateEmail,
  updateUserName,
  changePassword,
  googleEndpoint,
  githubEndpoint,
  currentUser,
  updateProfile,
  updateAvatar,
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
  contactPost,
  getTopSellers,
  getLatestProperties,
  getRecentlySoldProperties,
  myListings,
  propertyDetail,
  getRecommendedListings,
};
