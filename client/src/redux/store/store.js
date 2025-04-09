import { configureStore ,combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userManagmentSlice from "../features/userManagmentSlice";
import auth from "../features/authSlice"

    
    // Combine your reducers
const rootReducer = combineReducers({
    userManagment : userManagmentSlice,
    auth:auth
  });


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userManagmentSlice' , 'userManagment']
};
    
    // Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
