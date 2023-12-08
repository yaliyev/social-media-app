import React from 'react'

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row } from 'antd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
const { Meta } = Card;



const Post = ({setOpenUserCommentsModalOpen}) => {
    return (
        <Col span={12}>
            <Card
                style={{
                    width: 400,height:600, margin: '20px'
                }}
                cover={
                    <img
                        alt="example"
                        src="https://images.pexels.com/photos/4972660/pexels-photo-4972660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{height:500,objectFit:'cover'}}
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
                        Post 1
                    </Col>
                    <Col span={8} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <CommentIcon onClick={()=>{setOpenUserCommentsModalOpen(true)}} />
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