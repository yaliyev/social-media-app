import { createSlice } from "@reduxjs/toolkit";
import { getUser, getUserById } from "../../services/api/user_request";

const initialState = {
    modals:{
        isUserDetailModelOpen : false,
        openUserPostsModalOpen : false,
        openUserCommentsModalOpen : false,
        openAddPostModalOpen : false
    }
}

const userModalSlice = createSlice({
    name:'userModal',
    initialState,
    reducers:{
        set_is_user_detail_model_open:(state,action)=>{
           state.modals.isUserDetailModelOpen = action.payload; 
        },
        set_open_user_posts_modal_open:(state,action)=>{
            state.modals.openUserPostsModalOpen = action.payload;
        },
        set_open_user_comments_modal_open: (state,action)=>{
            state.modals.openUserCommentsModalOpen = action.payload;
        },
        set_open_add_post_modal_open: (state,action) =>{
            state.modals.openAddPostModalOpen = action.payload;
        }
        
    }
})

export const {set_is_user_detail_model_open,set_open_user_posts_modal_open,set_open_user_comments_modal_open,set_open_add_post_modal_open} = userModalSlice.actions;

export default userModalSlice.reducer;