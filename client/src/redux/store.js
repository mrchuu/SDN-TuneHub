import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "./auth.js";
import sideBarReducer from "./sideBar.js";
import themeReducer from "./theme.js";
import playerReducer from "./player.js";
import searchReducer from "./search.js";
import windowReducer from "./window.js";
import storage from "redux-persist/lib/storage";
import artistUploadReducer from "./artistUpload.js";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"],
};
//them vao sau khi viet xong slice
const rootReducer = combineReducers({
  auth: authReducer,
  sideBar: sideBarReducer,
  theme: themeReducer,
  player: playerReducer,
  artistUpload: artistUploadReducer,
  search: searchReducer,
  window: windowReducer,
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
