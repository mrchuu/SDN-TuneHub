import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "./auth.js";
import sideBarReducer from "./sideBar.js";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  sideBar: sideBarReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
