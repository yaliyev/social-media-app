import React from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUsers } from '../../services/api/user_request';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Input, Modal, Row } from 'antd';
import { useFormik } from 'formik';
import Comment from './Comment';
import { setCurrentPost, set_merged_followings_posts, set_open_feed_comments_modal_open } from '../../redux/slices/feedSlice';





export default function FeedPage() {


  let user = useSelector((state) => state.user.user);

  let feed = useSelector((state) => state.feed);

  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();


  const navigateTo = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      const users = await getUsers();

      let posts = [];

      let userFollowingsIds = [...user.userObject.followings];


      userFollowingsIds.forEach((userFollowing) => {
        let thatUser = users.find(iteratedUser => iteratedUser.id == userFollowing.id);

        let newThatUserPosts = thatUser.posts.map(post => ({
          ...post,
          username: thatUser.username
        }));
        posts = posts.concat(newThatUserPosts);
      })


      posts = mixer(posts);

      posts.sort((a, b) => { return b.id - a.id });
      setUsers(users);
      dispatch(set_merged_followings_posts(posts));

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

  function mixer(array) {
    let currentIndex = array.length, randomIndex;


    while (currentIndex > 0) {


      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;


      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return (
    <>

{feed.currentPost ? <Modal bodyStyle={{ overflow: 'auto', maxHeight: '70vh' }} title={<h3 style={{ textAlign: 'center' }}>Comments</h3>} open={feed.modals.openFeedCommentsModalOpen} onCancel={() => { dispatch(set_open_feed_comments_modal_open(false)) }} footer="" >
              <Row style={{ marginTop: '15px' }}>

                {
                  feed.currentPost.comments.map((comment, index) => {
                    
                    return <Comment key={index} comment={comment} />
                  })
                }




              </Row>
              <Form

                onFinish={()=>{}}
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

            </Modal> : <></> }


      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >

        {feed.mergedFollowingsPosts.map(post => {

          return <React.Fragment key={post.id}>
            

            <Grid  style={{ marginTop: '40px', marginLeft: '50px', marginBottom: '15px' }} item xs={3}>
              <Card sx={{ width: '400px' }}>
                <CardMedia
                  sx={{ height: 340 }}
                  image={post.image}
                  title={post.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The post is belongs to {post.username}
                  </Typography>
                </CardContent>
                <CardActions style={{ paddingLeft: '13px' }}>
                  <FavoriteBorderIcon />
                  <CommentIcon onClick={() => { dispatch(set_open_feed_comments_modal_open(true));dispatch(setCurrentPost(post)) }} />
                </CardActions>
              </Card>
            </Grid>
          </React.Fragment>


        })}

      </Grid>
    </>



  );
}

