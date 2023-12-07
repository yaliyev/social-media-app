import { configureStore } from "@reduxjs/toolkit";
import userReducer, { loadUserFromLocalStorage } from './slices/userSlice';

const store = configureStore({
    reducer:{
        user:userReducer
    }
})
store.dispatch(loadUserFromLocalStorage());

export default store