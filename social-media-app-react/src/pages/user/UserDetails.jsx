import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined, FileImageOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const UserDetails = () => {
  let user = useSelector((state) => state.user.user);
  const navigateTo = useNavigate();
  const [loadedProfilePhoto,setLoadedProfilePhoto] = useState(false);
  useEffect(() => {
    if (user.userObject == null) {

      navigateTo("/login")

    }
  }, [])

  return (
    <Col span={24} style={{ paddingTop: '100px' }}>
      {user.userObject ?
        <Row>
          <Col offset={9}>
            <Card
              style={{
                width: '400px',
              }}
              cover={
                
                <img 
                  alt="example"
                  src={user.userObject.profilePicture}
                />
              }
              actions={[
                <EditOutlined key="edit" />,
                <FileImageOutlined />,
              ]}
            >
              <Meta
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