import React from 'react'

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row, Modal, Input, Button, Form } from 'antd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { setCurrentPost } from '../../redux/slices/clickedSearchUserSlice';
import { setCurrentPostIndex } from '../../redux/slices/clickedSearchUserSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Comment from './Comment';
import { putUser } from '../../services/api/user_request';
import { set_open_searchuser_comments_modal_open } from '../../redux/slices/clickedSearchUserModalSlice';
const { Meta } = Card;



const SearchUserPost = ({ post, postIndex }) => {



    const user = useSelector((state) => state.user.user);


    let userModal = useSelector((state) => state.userModal.modals);

    let dispatch = useDispatch();


    async function likePost() {

        let thisPost = { ...post };

        let thisUserLikeinThisPost = thisPost.likes.find((like) => like.id === user.userObject.id);

        if (thisUserLikeinThisPost == undefined) {
            let thisPostLikes = [...thisPost.likes];

            thisPostLikes.push({ id: user.userObject.id });

            const thisUserPosts = [...user.userObject.posts];

            thisUserPosts[postIndex] = {
                ...thisUserPosts[postIndex],
                likes: [...thisPostLikes]
            };

            const newThisUser = {
                ...user.userObject,
                posts: [...thisUserPosts]
            }

            await putUser(newThisUser);

            await dispatch(putUserReducer(newThisUser));





        }

    }

    async function dislikePost(){
        let thisPost = { ...post };

        let thisUserLikeinThisPostIndex = -1;  
        thisPost.likes.find((like,index) =>{
            if(like.id === user.userObject.id){
                thisUserLikeinThisPostIndex = index; 
            }
        } );

        if (thisUserLikeinThisPostIndex > -1) {
            let thisPostLikes = [...thisPost.likes];

            thisPostLikes.splice(thisUserLikeinThisPostIndex,1);



            

            const thisUserPosts = [...user.userObject.posts];

            thisUserPosts[postIndex] = {
                ...thisUserPosts[postIndex],
                likes: [...thisPostLikes]
            };

            const newThisUser = {
                ...user.userObject,
                posts: [...thisUserPosts]
            }

            

            await putUser(newThisUser);

            await dispatch(putUserReducer(newThisUser));
    }


    }



    return (
        <>


            <Col span={12}>
                <Card
                    style={{
                        width: 400, height: 470, margin: '20px'
                    }}
                    cover={
                        // <img
                        //     alt="example"
                        //     src={post.image} style={{height:500,objectFit:'cover'}}
                        // />

                        <LazyLoadImage
                            style={{ width: '100%', height: 350, objectFit: 'cover' }}
                            effect='blur'
                            placeholderSrc={post.image}
                            src={post.image} // use normal <img> attributes as props
                        />
                    }
                    actions={[

                    ]}
                >

                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            {post.likes.some((like) => like.id === user.userObject.id) ? (
                                <FavoriteIcon onClick={()=>{dislikePost()}} />
                            ) : (<FavoriteBorderIcon onClick={() => { likePost() }} />)}


                        </Col>
                        <Col span={8}>
                            {post.title}
                        </Col>
                        <Col span={8} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <CommentIcon onClick={() => { dispatch(set_open_searchuser_comments_modal_open(true)); dispatch(setCurrentPost(post)); dispatch(setCurrentPostIndex(postIndex)) }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }} gutter={[16, 16]}>
                        <Col span={12}>
                            Likes: <span>{post.likes.length}</span>
                        </Col>

                        <Col span={12}>
                            Comments: <span>{post.comments.length}</span>
                        </Col>
                    </Row>



                </Card>

            </Col>

        </>




    )
}

export default SearchUserPost