import { createSlice } from "@reduxjs/toolkit";
import { getUser, getUserById } from "../../services/api/user_request";

const initialState = {
    modals: {

        openFeedCommentsModalOpen: false

    },
    mergedFollowingsPosts: [],
    currentPost: { comments: [] },
    currentPostIndex: -1
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {


        set_open_feed_comments_modal_open: (state, action) => {
            state.modals.openFeedCommentsModalOpen = action.payload;
        },
        set_merged_followings_posts: (state, action) => {
            state.mergedFollowingsPosts = action.payload;
        },
        setCurrentPost: (state,action) =>{
            state.currentPost = action.payload;
        },
        getCurrentPost: (state,action) =>{
            return state.currentPost;
        },
        setCurrentPostIndex: (state,action) =>{
            state.currentPostIndex = action.payload;
        }

    }
})

export const { set_open_feed_comments_modal_open, set_merged_followings_posts,setCurrentPost,getCurrentPost,setCurrentPostIndex } = feedSlice.actions;

export default feedSlice.reducer;