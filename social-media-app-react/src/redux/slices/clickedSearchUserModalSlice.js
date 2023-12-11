import { createSlice } from "@reduxjs/toolkit";
import { getUser, getUserById } from "../../services/api/user_request";

const initialState = {
    modals:{
       
        openSearchUserPostsModalOpen : false,
        openSearchUserCommentsModalOpen : false
        
    }
}

const clickedSearchUserModalSlice = createSlice({
    name:'clickedSearchUserModal',
    initialState,
    reducers:{
        
        set_open_searchuser_posts_modal_open:(state,action)=>{
            state.modals.openSearchUserPostsModalOpen = action.payload;
        },
        set_open_searchuser_comments_modal_open: (state,action)=>{
            state.modals.openSearchUserCommentsModalOpen = action.payload;
        }
       
        
    }
})

export const {set_open_searchuser_posts_modal_open,set_open_searchuser_comments_modal_open} = clickedSearchUserModalSlice.actions;

export default clickedSearchUserModalSlice.reducer;