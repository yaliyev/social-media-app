import { createAsyncThunk, createSlice,current } from "@reduxjs/toolkit";


const initialState = {
    clickedSearchUser: {
        
        userObject: null,
        loading: false,
        currentPost : {comments:[]},
        currentPostIndex : -1
        
    }
}

const clickedSearchUserSlice = createSlice({
    name: 'clickedSearchUser',
    initialState,
    reducers: {
        
        
        putClickedSearchUserReducer: (state, action) => {
            state.clickedSearchUser.userObject = action.payload;
        },
        addComment: (state,action) => {
             state.clickedSearchUser.userObject.posts[action.payload.postIndex].comments.push(action.payload.comment);

             
            
             state.clickedSearchUser.currentPost = state.clickedSearchUser.userObject.posts[action.payload.postIndex];

             
        },
        setCurrentPost: (state,action) =>{
            state.clickedSearchUser.currentPost = action.payload;
        },
        getCurrentPost: (state,action) =>{
            return state.clickedSearchUser.currentPost;
        },
        setCurrentPostIndex: (state,action) =>{
            state.clickedSearchUser.currentPostIndex = action.payload;
        }

    }
})



export const addCommentAsync = createAsyncThunk(
    "user/addCommentAsync",
    async (commentData, { dispatch,getState }) => {
      const {clickedSearchUser} = getState();
     dispatch(addComment(commentData));
    
      return clickedSearchUser.clickedSearchUser.userObject.posts[commentData.postIndex].comments;
    }
  );



export const { putClickedSearchUserReducer,addComment,setCurrentPost,setCurrentPostIndex } = clickedSearchUserSlice.actions;

export default clickedSearchUserSlice.reducer;