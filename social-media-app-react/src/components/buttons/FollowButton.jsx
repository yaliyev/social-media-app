import { Button } from 'antd'
import React from 'react'
import { getUserById, putUser } from '../../services/api/user_request';
import { useSelector } from 'react-redux';

const FollowButton = ({userId,searchUsers,setSearchUsers}) => {

  let user = useSelector((state) => state.user.user);
  

  async function sendFollowRequest(personWhoWillCheckRequestId){

    

    const thisUserId = user.userObject.id;

    const personWhoWillCheckRequest = await getUserById(personWhoWillCheckRequestId);

    let isExistThisPerson = personWhoWillCheckRequest.requests.find((iteratedUser)=>iteratedUser.id == thisUserId);

    if(isExistThisPerson == undefined){
      let newPersonWhoWillCheckRequest = {
        ...personWhoWillCheckRequest,
        requests: [...personWhoWillCheckRequest.requests,{id:thisUserId,status:'pending'}]
      }
      
      let thisUser = user.userObject;
      let newThisUser = {
        ...thisUser,
        requests: [...thisUser.requests,{id:personWhoWillCheckRequestId,status:'sent'}]
      }
      
      putUser(newPersonWhoWillCheckRequest)
      putUser(newThisUser)

      let newPersonWhoWillCheckRequestInSearchUsersIndex = -1;

      searchUsers.find((iteratedUser,index)=>{
          if(iteratedUser.id == newPersonWhoWillCheckRequest.id){
            newPersonWhoWillCheckRequestInSearchUsersIndex = index;
          }
      })

      const newSearchUsers = [...searchUsers];

      newSearchUsers[newPersonWhoWillCheckRequestInSearchUsersIndex] = newPersonWhoWillCheckRequest;

      setSearchUsers(newSearchUsers);
      
      
    }



  }

  return (
    <Button onClick={()=>{sendFollowRequest(userId)}} type='primary'>Follow</Button>
  )
}

export default FollowButton