import { Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/api/user_request';

const Requests = () => {

  let user = useSelector((state) => state.user.user);

  const [requestUsers, setRequestUsers] = useState([]);
  const [requestsToThisUser,setRequestsToThisUser] = useState([]);

  const navigateTo = useNavigate();

  useEffect(()=>{
    // async function loadUsers() {
    //   let data = await getUsers();
    //   console.log(requestsToThisUser);
    //   let filteredUsers = requestsToThisUser.filter((requestUser)=>{
    //      let requestUserInData = data.find((iteratedDataUser)=>iteratedDataUser.id == requestUser.id);

    //      if(requestUserInData != undefined){
    //       return requestUserInData;
    //      }

    //   })

    //   console.log(filteredUsers);

    // }  
function loadRequests(){
    setRequestsToThisUser([...user.userObject.requests]);
}

if (user.userObject == null) {

  navigateTo("/login")

} else {
  loadRequests();
}

  },[]);

  useEffect(()=>{
    async function loadUsers() {
      let newUsersData = [];
      let data = await getUsers();
      console.log(requestsToThisUser);
      requestsToThisUser.filter((requestUser)=>{
         let requestUserInData = data.find((iteratedDataUser)=>iteratedDataUser.id == requestUser.id);

         if(requestUserInData != undefined){
          newUsersData.push({...requestUserInData,status:requestUser.status});
         }

      })
       console.log(newUsersData);
      setRequestUsers(newUsersData);

    }
    
    if(requestsToThisUser.length != 0){
      loadUsers();
    }
    

  },[requestsToThisUser])

  return (
    <Col span={24}>

<Row style={{ padding: '20px' }}>

{requestUsers.map((iteratedUser) => {
  if(iteratedUser.status == 'pending'){
    return <Col key={iteratedUser.id} span={6} style={{ padding: '10px' }}>

    <Card
      style={{
        
      }}
      cover={

        <img
          alt="example"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      }
      actions={[

        // <FileImageOutlined title='User posts' onClick={() => { dispatch(set_open_user_posts_modal_open(true)) }} />,

      ]}
    >

      <Meta
        title={<h3 style={{ textAlign: 'center' }}>{iteratedUser.username}</h3>}
        description={<p style={{ textAlign: 'center' }}>{iteratedUser.bio}</p>}
      />

      
    </Card>
  </Col>
  }
  

})}

</Row>
    
    </Col>
  )
}

export default Requests