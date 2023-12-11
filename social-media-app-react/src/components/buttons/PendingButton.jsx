import React from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, putUser } from '../../services/api/user_request';
import { putUserReducer } from '../../redux/slices/userSlice';


const PendingButton = ({userId,searchUsers,setSearchUsers}) => {

  let user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  async function cancelRequest(followingUserId){

    const thisUserId = user.userObject.id;

    const followingUser = await getUserById(followingUserId);

    let thisUser = {...user.userObject};

    let thisUserRequests = [...thisUser.requests];
    
    let thisUserPendingRequestIndex = -1;

    
    thisUserRequests.find((request,index)=>{
      
      if(request.id == followingUserId && request.status == 'sent'){
        
        thisUserPendingRequestIndex = index;
      }
    })

    thisUserRequests.splice(thisUserPendingRequestIndex,1);

    let newThisUser = {
      ...thisUser,
      requests: [...thisUserRequests]
    }

    

    const followingUserRequests = [...followingUser.requests];

    let followingUserPendingRequestIndex = -1;

    
    followingUserRequests.find((request,index)=>{
      if(request.id == thisUserId && request.status == 'pending'){
        
        followingUserPendingRequestIndex = index;
      }
    })

    followingUserRequests.splice(followingUserPendingRequestIndex,1);

    let newFollowingUser = {
      ...followingUser,
      requests: [...followingUserRequests]
    }
    
    await putUser(newThisUser);
    await putUser(newFollowingUser);

    await dispatch(putUserReducer(newThisUser));
    
    let newFollowingUserInSearchUsersIndex = -1;

      searchUsers.find((iteratedUser,index)=>{
          if(iteratedUser.id == followingUser.id){
            newFollowingUserInSearchUsersIndex = index;
          }
      })

      const newSearchUsers = [...searchUsers];

      newSearchUsers[newFollowingUserInSearchUsersIndex] = newFollowingUser;

      setSearchUsers(newSearchUsers);


      

  }

  return (
    <Button onClick={()=>{cancelRequest(userId)}} type='primary' style={{backgroundColor:'orange'}}>Pending</Button>
  )
}

export default PendingButton