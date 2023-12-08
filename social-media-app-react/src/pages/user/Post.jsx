import React from 'react'

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row, Modal, Input, Button, Form } from 'antd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { set_open_user_comments_modal_open } from '../../redux/slices/userModalSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addComment, addCommentAsync } from '../../redux/slices/userSlice';
import Comment from './Comment';
const { Meta } = Card;



const Post = ({ post, postIndex }) => {

    

    const user = useSelector((state) => state.user.user);

    console.log(post);
    console.log(user);

    let userModal = useSelector((state) => state.userModal.modals);

    let dispatch = useDispatch();


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
           
            let comments = await dispatch(addCommentAsync({ postIndex: postIndex, comment: newComment }));

           
// console.log(user.userObject);
            // console.log(posts);
            // const updatedUser = {
            //   ...user.userObject,
            //   posts: [...user.userObject.posts, newPost]
            // }
            // putUser(updatedUser);
            // actions.resetForm();

            // dispatch(set_open_add_post_modal_open(false))
            // Swal.fire({
            //   icon: "success",
            //   title: "Add post",
            //   html: "Post has been added",
            //   timer: 1600
            // })
        }
    })



    return (
        <>
            <Modal bodyStyle={{ overflow: 'auto', maxHeight: '70vh' }} title={<h3 style={{ textAlign: 'center' }}>Comments</h3>} open={userModal.openUserCommentsModalOpen} onCancel={() => { dispatch(set_open_user_comments_modal_open(false)) }} footer="" >
                <Row style={{ marginTop: '15px' }}>

                    {
                        post.comments.map((comment, index) => {
                           return <Comment key={index} comment={comment} postIndex={postIndex} />
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

            <Col span={12}>
                <Card
                    style={{
                        width: 400, height: 600, margin: '20px'
                    }}
                    cover={
                        // <img
                        //     alt="example"
                        //     src={post.image} style={{height:500,objectFit:'cover'}}
                        // />

                        <LazyLoadImage
                            style={{ width: '100%', height: 500, objectFit: 'cover' }}
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
                            <FavoriteBorderIcon />

                        </Col>
                        <Col span={8}>
                            {post.title}
                        </Col>
                        <Col span={8} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <CommentIcon onClick={() => { dispatch(set_open_user_comments_modal_open(true)) }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }} gutter={[16, 16]}>
                        <Col span={12}>
                            Likes: <span>10</span>
                        </Col>

                        <Col span={12}>
                            Comments: <span>2</span>
                        </Col>
                    </Row>



                </Card>

            </Col>

        </>




    )
}

export default Post