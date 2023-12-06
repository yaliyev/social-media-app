import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined,FileImageOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const UserDetails = () => {
  let user = useSelector((state)=>state.user.user);
const navigateTo = useNavigate();

useEffect(()=>{
  if(user.userObject == null){
    
    navigateTo("/login")

  }
},[])
  
  return (
    <Col span={24} style={{paddingTop:'200px'}}>
      {user.userObject ?
      <Row>
      <Col offset={10}>
        <Card
          style={{
            width: '100%',
          }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <EditOutlined key="edit" />,
            <FileImageOutlined />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
            title={user.userObject.username}
            description={user.userObject.bio}
          />
        </Card>
      </Col>
    </Row> : <></>
      }
      
    </Col>

  )
}

export default UserDetails