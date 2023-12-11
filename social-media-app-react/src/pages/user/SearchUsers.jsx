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
            return <Col key={iteratedUser.id} span={6} style={{ padding: '10px' }}>

              <Card
                style={{

                }}
                cover={

                  <img
                    alt="example"
                    src={iteratedUser.profilePicture}
                    style={{ marginTop: '10px', height: '300px', objectFit: 'contain' }}
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

                  description={<p style={{ textAlign: 'center' }}>Followings: {iteratedUser.followings.length}</p>}
                />

                <Meta

                  description={<p style={{ textAlign: 'center' }}>Posts: {iteratedUser.posts.length}</p>}
                />


                <Meta
                  description={
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {iteratedUser.followers.some((follower) => follower.id === user.userObject.id) ? (
                        <UnfollowButton userId={iteratedUser.id}
                          searchUsers={searchUsers}
                          setSearchUsers={setSearchUsers} />
                      ) : iteratedUser.requests.some((request) => request.id === user.userObject.id && request.status == 'pending') ? (
                        <PendingButton userId={iteratedUser.id}
                        searchUsers={searchUsers}
                        setSearchUsers={setSearchUsers}  />
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