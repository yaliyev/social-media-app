import { Button, Card, Col, Form, Input, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
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
import { addCommentAsync, putClickedSearchUserReducer } from '../../redux/slices/clickedSearchUserSlice';
import { set_open_searchuser_posts_modal_open } from '../../redux/slices/clickedSearchUserModalSlice';
import { set_open_searchuser_comments_modal_open } from '../../redux/slices/clickedSearchUserModalSlice';
import SearchUserPost from './SearchUserPost';
import Comment from './Comment';
import { useFormik } from 'formik';

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

  
  let addCommentFormik = useFormik({
    initialValues: {
        text: ''
    },
    onSubmit: async (values, actions) => {

        const newComment = {
            id: Date.now(),
            text: values.text,
            authorId: user.userObject.id
        }
       
        let comments = await dispatch(addCommentAsync({ postIndex: clickedSearchUser.currentPostIndex, comment: newComment }));

        let editedPosts = [...clickedSearchUser.userObject.posts];
        const updatedPost = {
          ...editedPosts[clickedSearchUser.currentPostIndex],
          comments: [...editedPosts[clickedSearchUser.currentPostIndex].comments, { ...newComment }]
        };
        editedPosts[clickedSearchUser.currentPostIndex] = updatedPost;
      
        const updatedUser = {
          ...clickedSearchUser.userObject,
          posts: editedPosts
        };

       
        putUser(updatedUser);
        actions.resetForm();

         
        Swal.fire({
          icon: "success",
          title: "Add Comment",
          html: "Comment has been added",
          timer: 1600
        })
    }
})





  return (
    <>

      <Col span={24} style={{ marginTop: '20px' }}>

        {clickedSearchUser.userObject ? 
        <>
        <Modal bodyStyle={{ overflow: 'auto', height: '67vh' }} title={<h3 style={{ textAlign: 'center' }}>User posts({clickedSearchUser.userObject.username})</h3>} width={1000} open={clickedSearchUserModal.openSearchUserPostsModalOpen} onCancel={() => { dispatch(set_open_searchuser_posts_modal_open(false)) }} footer="" >

<Row style={{ marginTop: '15px' }}>

  {

    clickedSearchUser.userObject.posts.map((post, index) => {
      return <SearchUserPost key={index} post={post} postIndex={index} />
    })
  }


</Row>

</Modal>
<Modal bodyStyle={{ overflow: 'auto', maxHeight: '70vh' }} title={<h3 style={{ textAlign: 'center' }}>Comments</h3>} open={clickedSearchUserModal.openSearchUserCommentsModalOpen} onCancel={() => { dispatch(set_open_searchuser_comments_modal_open(false)) }} footer="" >
<Row style={{ marginTop: '15px' }}>

   {
       clickedSearchUser.currentPost.comments.map((comment, index) => {
          return <Comment key={index} comment={comment}  />
       })
   }




</Row>
<Form

   onFinish={addCommentFormik.handleSubmit}
   onFinishFailed={() => { }}
   autoComplete="off"
   
>
   <Row style={{ display: 'flex', columnGap: '10px', marginTop: '20px' }}>




       <Col span={20}>

           <Input name={'text'} onChange={addCommentFormik.handleChange} value={addCommentFormik.values.text} placeholder="Type a comment:" />
       </Col>
       <Col>
           <Button type="primary" htmlType='submit'>Add</Button>
       </Col>





   </Row>
</Form>

</Modal>
        </>
        :  <></>}


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