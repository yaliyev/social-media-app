import { Avatar, Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import { getUserById } from '../../services/api/user_request';
import { useState } from 'react';
import { useEffect } from 'react';
import { addComment } from '../../redux/slices/userSlice';

const Comment = ({comment,postIndex}) => {

 
  const [authorUser,setAuthorUser] = useState(null);

  useEffect(()=>{

    async function loadAuthorUser(){
      let authorUserObj = await getUserById(comment.authorId); 
      console.log(authorUserObj);
      setAuthorUser(authorUserObj); 
    }

    loadAuthorUser();
  },[]);

  
  
  return (
    <>
    {authorUser ? <Col span={24}>
          <Row>
            <Col style={{marginTop:'15px'}} span={10}>
                
            <Avatar alt="Remy Sharp" src={authorUser.profilePicture} />
            <b>{authorUser.username}</b>
            </Col>
            <Col span={14} style={{padding:'4px'}}>
             {comment.text}
            </Col>
          </Row>

         
        </Col> : <></>  }
    
    </>
    

        
  )
}



export default Comment