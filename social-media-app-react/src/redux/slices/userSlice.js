import { createSlice } from "@reduxjs/toolkit";

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
        }
        
    }
})

export const {sign_in,logout} = userSlice.actions;

export default userSlice.reducer;