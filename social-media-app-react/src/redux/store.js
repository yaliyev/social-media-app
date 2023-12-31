import { configureStore } from "@reduxjs/toolkit";
import userReducer, { loadUserFromLocalStorage } from './slices/userSlice';
import userModalReducer from './slices/userModalSlice';
import clickedSearchUserModalReducer from "./slices/clickedSearchUserModalSlice";
import clickedSearchUserReducer from "./slices/clickedSearchUserSlice";
import feedReducer from './slices/feedSlice';
const store = configureStore({
    reducer:{
        user:userReducer,
        userModal: userModalReducer,
        clickedSearchUserModal: clickedSearchUserModalReducer,
        clickedSearchUser: clickedSearchUserReducer,
        feed: feedReducer
    }
})
store.dispatch(loadUserFromLocalStorage());

export default store