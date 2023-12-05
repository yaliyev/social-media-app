import React from 'react'

const SessionChecker = () => {

 let userStatusStr = localStorage.getItem("social-media-app-yagub-user-status");
 
 let userStatus;

 if(userStatusStr != null){
    userStatus = JSON.parse(userStatusStr);
 }

 function checkUserLoginStatus(){
    if(userStatus.isLogined == true){
        
    } 
 }   

  return (
    <div>SessionChecker</div>
  )
}

export default SessionChecker