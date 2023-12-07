import { createSlice } from "@reduxjs/toolkit";
import { getUser, getUserById } from "../../services/api/user_request";

const initialState = {
    user:{
        isLogined:false,
        userObject: null,
        loading: false
    }
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        sign_in:(state,action)=>{
            state.user.isLogined = true
            state.user.userObject = action.payload
        },
        sign_out:(state,action)=>{
            state.user.isLogined = false
            state.user.userObject = null
        },
        putUserReducer: (state,action)=>{
            state.user.userObject = action.payload;
        }
        
    }
})

export const loadUserFromLocalStorage = () => async (dispatch) => {
 
        const storedUserObject = localStorage.getItem('social-media-app-yagub-user-status');

        if (storedUserObject != "null") {
            let storedUserJSObject = JSON.parse(storedUserObject);
            // dispatch(setUserLoading(true)); 
            const response = await getUserById(storedUserJSObject.id); 
            dispatch(putUserReducer(response)); 
        }
    
};

export const {sign_in,sign_out,putUserReducer} = userSlice.actions;

export default userSlice.reducer;