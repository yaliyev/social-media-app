import { Button, Card, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileImageOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import FollowButton from '../../components/buttons/FollowButton';
import UnfollowButton from '../../components/buttons/UnfollowButton';
import { getUserById, getUsers, putUser } from '../../services/api/user_request';
import PendingButton from '../../components/buttons/PendingButton';

const SearchUsers = () => {

  let user = useSelector((state) => state.user.user);


  const [users, setUsers] = useState([]);

  const [searchUsers, setSearchUsers] = useState([]);

  const navigateTo = useNavigate();

  useEffect(() => {

    async function loadUsers() {
      let data = await getUsers();

      let thisUserIndex = -1;
      data.find((dataResultIterated, index) => {

        if (dataResultIterated.username == user.userObject.username) {
          thisUserIndex = index;
        }
      })

      data.splice(thisUserIndex, 1);
      setUsers(data);
    }

    if (user.userObject == null) {

      navigateTo("/login")

    } else {
      loadUsers();
    }
  }, [])

  // async function sendFollowRequest(personWhoWillCheckRequestId){



  //   const thisUserId = user.userObject.id;

  //   const personWhoWillCheckRequest = await getUserById(personWhoWillCheckRequestId);

  //   let isExistThisPerson = personWhoWillCheckRequest.requests.find((iteratedUser)=>iteratedUser.id == thisUserId);

  //   if(isExistThisPerson == undefined){
  //     let newPersonWhoWillCheckRequest = {
  //       ...personWhoWillCheckRequest,
  //       requests: [...personWhoWillCheckRequest.requests,{id:thisUserId,status:'pending'}]
  //     }

  //     let thisUser = user.userObject;
  //     let newThisUser = {
  //       ...thisUser,
  //       requests: [...thisUser.requests,{id:personWhoWillCheckRequestId,status:'sent'}]
  //     }
  //     console.log(newThisUser);
  //     putUser(newPersonWhoWillCheckRequest)
  //     putUser(newThisUser)

  //     let newPersonWhoWillCheckRequestInSearchUsersIndex = -1;

  //     searchUsers.find((iteratedUser,index)=>{
  //         if(iteratedUser.id == newPersonWhoWillCheckRequest.id){
  //           newPersonWhoWillCheckRequestInSearchUsersIndex = index;
  //         }
  //     })

  //     const newSearchUsers = [...searchUsers];

  //     newSearchUsers[newPersonWhoWillCheckRequestInSearchUsersIndex] = newPersonWhoWillCheckRequest;

  //     setSearchUsers(newSearchUsers);


  //   }



  // }


  return (
    <>
      <Col span={24} style={{ marginTop: '20px' }}>

        <Row>
          <Col offset={8} span={8}>
            <Input onChange={(e) => {
              let searchResult = [];

              if (e.target.value == "") {
                searchResult = [];
              } else {
                searchResult = users.filter((user) => {
                  return user.username.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
                })



              }


              setSearchUsers(searchResult);
            }} placeholder='Search user:' />
          </Col>
        </Row>

        <Row style={{ padding: '20px' }}>

          {searchUsers.map((iteratedUser) => {
            return <Col key={iteratedUser.id} span={4} style={{ padding: '10px' }}>

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

                <Meta

                  description={<p style={{ textAlign: 'center' }}>Followers: {iteratedUser.followers.length}</p>}
                />


                <Meta
                  description={
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {iteratedUser.followers.some((follower) => follower.id === user.userObject.id) ? (
                        <UnfollowButton userId={iteratedUser.id}
                        searchUsers={searchUsers}
                        setSearchUsers={setSearchUsers} />
                      ) : iteratedUser.requests.some((request) => request.id === user.userObject.id && request.status == 'pending' ) ? (
                        <PendingButton />
                      ) : (
                        <FollowButton
                          userId={iteratedUser.id}
                          searchUsers={searchUsers}
                          setSearchUsers={setSearchUsers}
                        />
                      )}
                    </div>
                  }
                />
              </Card>
            </Col>

          })}

        </Row>




      </Col>
    </>


  )
}

export default SearchUsers