import { configureStore } from "@reduxjs/toolkit";
import userReducer, { loadUserFromLocalStorage } from './slices/userSlice';
import userModalReducer from './slices/userModalSlice';

const store = configureStore({
    reducer:{
        user:userReducer,
        userModal: userModalReducer
    }
})
store.dispatch(loadUserFromLocalStorage());

export default store