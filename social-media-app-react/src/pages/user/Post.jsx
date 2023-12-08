import React from 'react'

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row } from 'antd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { set_open_user_comments_modal_open } from '../../redux/slices/userModalSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const { Meta } = Card;



const Post = ({reRenderPosts,post}) => {
console.log(post);
    let userModal = useSelector((state) => state.userModal.modals);

  let dispatch = useDispatch();


    return (
        
            <Col span={12}>
            <Card
                style={{
                    width: 400,height:600, margin: '20px'
                }}
                cover={
                    // <img
                    //     alt="example"
                    //     src={post.image} style={{height:500,objectFit:'cover'}}
                    // />
                    
                    <LazyLoadImage
                    style={{width:'100%',height:500,objectFit:'cover'}}
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
                        <CommentIcon onClick={()=>{dispatch(set_open_user_comments_modal_open(true))}} />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}} gutter={[16, 16]}>
                    <Col span={12}>
                        Likes: <span>10</span>
                    </Col>

                    <Col span={12}>
                        Comments: <span>2</span>
                    </Col>
                </Row>



            </Card>

        </Col> 
        
        
    )
}

export default Post