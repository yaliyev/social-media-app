import { Button, Card, Col, Input, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileImageOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import FollowButton from '../../components/buttons/FollowButton';
import UnfollowButton from '../../components/buttons/UnfollowButton';
import { getUserById, getUsers, putUser } from '../../services/api/user_request';
import PendingButton from '../../components/buttons/PendingButton';
import PostsButton from '../../components/buttons/PostsButton';
import Post from './Post';
import { putClickedSearchUserReducer } from '../../redux/slices/clickedSearchUserSlice';
import { set_open_searchuser_posts_modal_open } from '../../redux/slices/clickedSearchUserModalSlice';

const SearchUsers = () => {

  let user = useSelector((state) => state.user.user);

  let clickedSearchUser = useSelector((state) => state.clickedSearchUser.clickedSearchUser);
  let clickedSearchUserModal = useSelector((state) => state.clickedSearchUserModal.modals);

  const dispatch = useDispatch();

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

        {clickedSearchUser.userObject ? <Modal bodyStyle={{ overflow: 'auto', height: '67vh' }} title={<h3 style={{ textAlign: 'center' }}>User posts({clickedSearchUser.userObject.username})</h3>} width={1000} open={clickedSearchUserModal.openSearchUserPostsModalOpen} onCancel={() => { dispatch(set_open_searchuser_posts_modal_open(false)) }} footer="" >

          <Row style={{ marginTop: '15px' }}>

            {

              clickedSearchUser.userObject.posts.map((post, index) => {
                return <Post key={index} post={post} postIndex={index} />
              })
            }


          </Row>

        </Modal> :  <></>}


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

                />

                <Meta

                  description={<p style={{ textAlign: 'center' }}>Bio: {iteratedUser.bio} ,Followers: {iteratedUser.followers.length} , Followings: {iteratedUser.followings.length} , Posts: {iteratedUser.posts.length}</p>}
                />




                <Meta
                  description={
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                      {iteratedUser.followers.some((follower) => follower.id === user.userObject.id) ? (
                        <>
                          <UnfollowButton userId={iteratedUser.id}
                            searchUsers={searchUsers}
                            setSearchUsers={setSearchUsers} />
                          {!iteratedUser.isPublic ? <PostsButton iteratedUser={iteratedUser} /> : <></>}

                        </>
                      ) : iteratedUser.requests.some((request) => request.id === user.userObject.id && request.status == 'pending') ? (
                        <PendingButton userId={iteratedUser.id}
                          searchUsers={searchUsers}
                          setSearchUsers={setSearchUsers} />
                      ) : (
                        <>
                          <FollowButton
                            userId={iteratedUser.id}
                            searchUsers={searchUsers}
                            setSearchUsers={setSearchUsers}
                          />
                          {iteratedUser.isPublic ? <PostsButton iteratedUser={iteratedUser} /> : <></>}
                        </>
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