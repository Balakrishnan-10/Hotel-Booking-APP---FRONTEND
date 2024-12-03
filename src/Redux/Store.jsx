import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slice/UserSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import ThemeReducer from "./Slice/ThemeSlice";

const rootReducer = combineReducers({
  Users: UserReducer,
  theme: ThemeReducer,
});

//persist store data even in rerendering
const persistConfig = {
  key: "root",
  storage: storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //Middleware to secure the localstorage data :
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares({ serializableCheck: false });
  },
});

export const persistor = persistStore(store);
