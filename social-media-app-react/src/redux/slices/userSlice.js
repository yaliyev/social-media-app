import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{
        isLogined:false
    }
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        sign_in:(state,action)=>{
            state.user.isLogined = true
        },
        logout:(state,action)=>{
            state.user.isLogined = false
        }
        
    }
})

export const {sign_in,logout} = userSlice.actions;

export default userSlice.reducer;