import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../services/api/user_request";

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
        logout:(state,action)=>{
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

        if (storedUserObject != null) {
            let storedUserJSObject = JSON.parse(storedUserObject);
            // dispatch(setUserLoading(true)); 
            const response = await getUser(storedUserJSObject); 
            dispatch(putUserReducer(response)); 
        }
    
};

export const {sign_in,logout,putUserReducer} = userSlice.actions;

export default userSlice.reducer;