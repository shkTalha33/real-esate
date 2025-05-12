/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable import/order */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { generalApiSlice } from "./slices";

// Define the root reducer
const rootReducer = combineReducers({
  [generalApiSlice.reducerPath]: generalApiSlice.reducer,
});

// Create the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], //  only persist auth slice
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(generalApiSlice.middleware),
});

export const persistor = persistStore(store);
