import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.jsx";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// Configure store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Add more reducers here if needed
  },
});

const persistor = persistStore(store);

export { store, persistor };
