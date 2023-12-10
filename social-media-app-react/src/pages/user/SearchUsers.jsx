import { Col, Input, Row } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchUsers = () => {

  let user = useSelector((state) => state.user.user);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (user.userObject == null) {

      navigateTo("/login")

    }
  }, [])

  return (
    <>
      <Col span={24} style={{marginTop:'20px'}}>

        <Row>
             <Col offset={8} span={8}>
              <Input placeholder='Search user:'/>
             </Col>    
        </Row>

      </Col>
    </>

    //   <Row>
    //   <Col offset={9}>
    //     <Card
    //       style={{
    //         width: '400px',
    //       }}
    //       cover={

    //         <img
    //           alt="example"
    //           src={user.userObject.profilePicture}
    //         />
    //       }
    //       actions={[
    //         <EditOutlined title='Edit User' onClick={() => { dispatch(set_is_user_detail_model_open(true)) }} key="edit" />,
    //         <FileImageOutlined title='User posts' onClick={() => { dispatch(set_open_user_posts_modal_open(true)) }} />,
    //         <PlusCircleOutlined title='Add post' onClick={() => { dispatch(set_open_add_post_modal_open(true)) }} />
    //       ]}
    //     >
    //       <Meta
    //         title={<h3 style={{ textAlign: 'center' }}>{user.userObject.username}</h3>}
    //         description={<p style={{ textAlign: 'center' }}>{user.userObject.bio}</p>}
    //       />
    //     </Card>
    //   </Col>
    // </Row>
  )
}

export default SearchUsers