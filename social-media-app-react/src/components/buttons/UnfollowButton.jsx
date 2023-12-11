import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, putUser } from '../../services/api/user_request';
import { putUserReducer } from '../../redux/slices/userSlice';

const UnfollowButton = ({userId,searchUsers,setSearchUsers}) => {

  let user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  async function unfollowUser(followingUserId){

    

    const thisUserId = user.userObject.id;

    const followingUser = await getUserById(followingUserId);

    let followingUserFollowers = [...followingUser.followers];

    let thisUserInFollowingUserFollowersIndex = -1;

    followingUserFollowers.find((follower,index)=>{
      if(follower.id == thisUserId){
        thisUserInFollowingUserFollowersIndex = index;
      }
    });

    followingUserFollowers.splice(thisUserInFollowingUserFollowersIndex,1);

    const newFollowingUser = {
      ...followingUser,
      followers: followingUserFollowers
    }

    const thisUserFollowings = [...user.userObject.followings];

    let followingUserInThisUserFollowingsIndex = -1;

    thisUserFollowings.find((following,index)=>{
      if(following.id == followingUserId){
        followingUserInThisUserFollowingsIndex = index;
      }
    });



    thisUserFollowings.splice(followingUserInThisUserFollowingsIndex,1);

    const newThisUser = {
      ...user.userObject,
      followings: thisUserFollowings
    }
    
    dispatch(putUserReducer(newThisUser));
    putUser(newThisUser);
    putUser(newFollowingUser);

    let followingUserInSearchUsersIndex = -1;

      searchUsers.find((iteratedUser,index)=>{
          if(iteratedUser.id == followingUser.id){
            followingUserInSearchUsersIndex = index;
          }
      })

     

    const newSearchUsers = [...searchUsers];

      newSearchUsers[followingUserInSearchUsersIndex] = {...newFollowingUser};

      setSearchUsers(newSearchUsers);
  }

  return (
    <Button onClick={()=>{unfollowUser(userId)}}  type='primary' danger>Unfollow</Button>
  )
}

export default UnfollowButton