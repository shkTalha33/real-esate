import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  priceRange: [0, 5000000],
  rating: null,
  bedrooms: 0,
  bathrooms: 0,
  hasKitchen: false,
  sort: "latest",
  activeFilters: {},
};

const propertyFilterSlice = createSlice({
  name: "propertyFilters",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.activeFilters = getActiveFilters({
        ...state,
        search: action.payload,
      });
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.activeFilters = getActiveFilters({
        ...state,
        priceRange: action.payload,
      });
    },
    setRating: (state, action) => {
      state.rating = action.payload;
      state.activeFilters = getActiveFilters({
        ...state,
        rating: action.payload,
      });
    },
    setBedrooms: (state, action) => {
      state.bedrooms = action.payload;
      state.activeFilters = getActiveFilters({
        ...state,
        bedrooms: action.payload,
      });
    },
    setBathrooms: (state, action) => {
      state.bathrooms = action.payload;
      state.activeFilters = getActiveFilters({
        ...state,
        bathrooms: action.payload,
      });
    },
    setHasKitchen: (state, action) => {
      state.hasKitchen = action.payload;
      state.activeFilters = getActiveFilters({
        ...state,
        hasKitchen: action.payload,
      });
    },
    setSortOption: (state, action) => {
      state.sort = action.payload;
      state.activeFilters = getActiveFilters({
        ...state,
        sort: action.payload,
      });
    },
    resetFilters: (state) => {
      return { ...initialState, activeFilters: {} };
    },
  },
});

// Helper function to get only the active filters
function getActiveFilters(state) {
  const activeFilters = {};

  if (state.search) activeFilters.search = state.search;
  if (state.priceRange[0] > 0 || state.priceRange[1] < 5000000) {
    activeFilters.priceRange = state.priceRange;
  }
  if (state.rating !== null) activeFilters.rating = state.rating;
  if (state.bedrooms > 0) activeFilters.bedrooms = state.bedrooms;
  if (state.bathrooms > 0) activeFilters.bathrooms = state.bathrooms;
  if (state.hasKitchen) activeFilters.hasKitchen = state.hasKitchen;
  if (state.sort !== "latest") activeFilters.sort = state.sort;

  return activeFilters;
}

export const {
  setSearch,
  setPriceRange,
  setRating,
  setBedrooms,
  setBathrooms,
  setHasKitchen,
  setSortOption,
  resetFilters,
} = propertyFilterSlice.actions;

export default propertyFilterSlice.reducer;
