import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { putClickedSearchUserReducer } from '../../redux/slices/clickedSearchUserSlice';
import { set_open_searchuser_posts_modal_open } from '../../redux/slices/clickedSearchUserModalSlice';

const PostsButton = ({iteratedUser}) => {
  
  let user = useSelector((state) => state.user.user);

  let clickedSearchUser = useSelector((state) => state.clickedSearchUser.clickedSearchUser);

  const dispatch = useDispatch()


  async function clickSearchUserFunction(searchUser){

    await dispatch(putClickedSearchUserReducer(searchUser));

  }
  

  return (
    <Button onClick={()=>{clickSearchUserFunction(iteratedUser);dispatch(set_open_searchuser_posts_modal_open(true))}}  type='primary' style={{marginLeft:'10px',backgroundColor: 'orange',color:'white'}}>Posts</Button>
  )
}

export default PostsButton