import { createAsyncThunk, createSlice,current } from "@reduxjs/toolkit";
import { getUser, getUserById } from "../../services/api/user_request";

const initialState = {
    user: {
        isLogined: false,
        userObject: null,
        loading: false
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        sign_in: (state, action) => {
            state.user.isLogined = true
            state.user.userObject = action.payload
        },
        sign_out: (state, action) => {
            state.user.isLogined = false
            state.user.userObject = null
        },
        putUserReducer: (state, action) => {
            state.user.userObject = action.payload;
        },
        addPost: (state, action) => {
            state.user.userObject.posts.push(action.payload);
           
           
            // const data = [...state.user.userObject.posts];
            // data.push(action.payload);
            // console.log(data);
            // state.user.userObject.posts = data;
        },
        addComment: (state,action) => {
             state.user.userObject.posts[action.payload.postIndex].comments.push(action.payload.comment);

             console.log( current(state.user.userObject.posts[action.payload.postIndex].comments));
        }

    }
})

export const addPostAsync = createAsyncThunk(
  "user/addPostAsync",
  async (postData, { dispatch,getState }) => {
    const {user} = getState();
    await dispatch(addPost(postData));

    return user.user.userObject.posts;
  }
);

export const addCommentAsync = createAsyncThunk(
    "user/addCommentAsync",
    async (commentData, { dispatch,getState }) => {
      const {user} = getState();
      await dispatch(addComment(commentData));

      return user.user.userObject.posts[commentData.postIndex].comments;
    }
  );

export const loadUserFromLocalStorage = () => async (dispatch) => {

    const storedUserObject = localStorage.getItem('social-media-app-yagub-user-status');

    if (storedUserObject != "null" && storedUserObject != null) {
        let storedUserJSObject = JSON.parse(storedUserObject);
        // dispatch(setUserLoading(true)); 
        const response = await getUserById(storedUserJSObject.id);
        dispatch(putUserReducer(response));
    }

};

export const { sign_in, sign_out, putUserReducer, addPost,addComment } = userSlice.actions;

export default userSlice.reducer;