import { Button, Col, Modal, Row, Form, Input, Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { EditOutlined, EllipsisOutlined, SettingOutlined, FileImageOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik, useFormikContext } from 'formik';
import { editUserSchema } from '../../validation/editUserValidation';
import { isExist, putUser } from '../../services/api/user_request';
import { putUserReducer } from '../../redux/slices/userSlice';
import Post from './Post';
import Comment from './Comment';
const { Meta } = Card;


const UserDetails = () => {

  let user = useSelector((state) => state.user.user);


  let dispatch = useDispatch();

  const [isUserDetailModelOpen, setIsUserDetailModelOpen] = useState(false);
  const [openUserPostsModalOpen, setOpenUserPostsModalOpen] = useState(false);
  const [openUserCommentsModalOpen,setOpenUserCommentsModalOpen] = useState(false);
  const [resetEditFormCounter, setResetEditFormCounter] = useState(0);
  const navigateTo = useNavigate();

  let formik = useFormik({

    initialValues: {

      'username': '',
      'fullName': '',
      'email': '',
      'password': '',
      'bio': '',
      'profilePicture': ''


    },
    enableReinitialize: true,
    onSubmit: async (values, actions) => {



      const editedUser = { ...user.userObject };

      editedUser.username = values.username;
      editedUser.fullName = values.fullName;
      editedUser.email = values.email;
      editedUser.password = values.password;
      editedUser.bio = values.bio;
      editedUser.profilePicture = values.profilePicture;


      const isExistResult = await isExist(editedUser);


      if (user.userObject.username != editedUser.username && user.userObject.email != editedUser.email) {
        if (!isExistResult.isExistUsername && !isExistResult.isExistEmail) {

          const responsePutUser = await putUser(editedUser);

          dispatch(putUserReducer(editedUser));
          setIsUserDetailModelOpen(false);
          Swal.fire({
            icon: "success",
            title: "Edit user",
            html: "User details have been changed",
            timer: 1600
          })

        } else {
          if (isExistResult.isExistUsername) {
            Swal.fire({
              icon: "error",
              title: "Register",
              html: `${editedUser.username} is exist already.Try another username`,
              timer: 1300
            })
          }
          if (isExistResult.isExistEmail) {
            Swal.fire({
              icon: "error",
              title: "Register",
              html: `${editedUser.email} is exist already.Try another email`,
              timer: 1300
            })
          }
        }
      } else if (user.userObject.username != editedUser.username) {
        if (!isExistResult.isExistUsername) {

          const responsePutUser = await putUser(editedUser);

          dispatch(putUserReducer(editedUser));
          setIsUserDetailModelOpen(false);
          Swal.fire({
            icon: "success",
            title: "Edit user",
            html: "User details have been changed",
            timer: 1600
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Register",
            html: `${editedUser.username} is exist already.Try another username`,
            timer: 1300
          })
        }
      } else if (user.userObject.email != editedUser.email) {
        if (!isExistResult.isExistEmail) {

          const responsePutUser = await putUser(editedUser);

          dispatch(putUserReducer(editedUser));
          setIsUserDetailModelOpen(false);
          Swal.fire({
            icon: "success",
            title: "Edit user",
            html: "User details have been changed",
            timer: 1600
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Register",
            html: `${editedUser.email} is exist already.Try another email`,
            timer: 1300
          })
        }
      }

      else {
        const responsePutUser = await putUser(editedUser);

        dispatch(putUserReducer(editedUser));
        setIsUserDetailModelOpen(false);
        Swal.fire({
          icon: "success",
          title: "Edit user",
          html: "User details have been changed",
          timer: 1600
        })
      }





    },
    validationSchema: editUserSchema
  });

  useEffect(() => {
    if (user.userObject == null) {

      navigateTo("/login")

    } else {
      formik.setValues({
        'username': user.userObject.username,
        'fullName': user.userObject.fullName,
        'email': user.userObject.email,
        'password': user.userObject.password,
        'bio': user.userObject.bio,
        'profilePicture': user.userObject.profilePicture
      })
    }
  }, [resetEditFormCounter])





  return (
    <Col span={24} style={{ paddingTop: '100px' }}>

      {user.userObject ?
        <>

          <Modal title={<h3 style={{ textAlign: 'center' }}>Edit User</h3>} open={isUserDetailModelOpen} onCancel={() => { setIsUserDetailModelOpen(false), setResetEditFormCounter(resetEditFormCounter + 1) }} footer="" >
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              style={{
                maxWidth: 600,
              }}
              onFinish={formik.handleSubmit}
              onFinishFailed={() => { }}
              autoComplete="off"
            >
              <Form.Item
                label="Username"

              >

                <Input name="username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              </Form.Item>

              <Row>
                <Col style={{ marginTop: '-20px', marginBottom: '10px' }} offset={6} span={4}>
                  {formik.errors.username && formik.touched.username && <div style={{ color: 'red' }}>{formik.errors.username}</div>}
                </Col>
              </Row>

              <Form.Item
                label="Fullname"


              >
                <Input name="fullName" value={formik.values.fullName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              </Form.Item>
              <Row>
                <Col style={{ marginTop: '-20px', marginBottom: '10px' }} offset={6} span={14}>
                  {formik.errors.fullName && formik.touched.fullName && <div style={{ color: 'red' }}>{formik.errors.fullName}</div>}
                </Col>
              </Row>
              <Form.Item
                label="Email"


              >
                <Input name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              </Form.Item>
              <Row>
                <Col style={{ marginTop: '-20px', marginBottom: '10px' }} offset={6} span={14}>
                  {formik.errors.email && formik.touched.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
                </Col>
              </Row>
              <Form.Item
                label="Password"


              >
                <Input.Password name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              </Form.Item>
              <Row>
                <Col style={{ marginTop: '-20px', marginBottom: '10px' }} offset={6} span={18}>
                  {formik.errors.password && formik.touched.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
                </Col>
              </Row>
              <Form.Item
                label="Bio"


              >
                <Input name="bio" value={formik.values.bio} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              </Form.Item>
              <Row>
                <Col style={{ marginTop: '-20px', marginBottom: '10px' }} offset={6} span={4}>
                  {formik.errors.bio && formik.touched.bio && <div style={{ color: 'red' }}>{formik.errors.bio}</div>}
                </Col>
              </Row>
              <Form.Item
                label="Profile picture"


              >
                <Input name="profilePicture" value={formik.values.profilePicture} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              </Form.Item>
              <Row>
                <Col style={{ marginTop: '-20px', marginBottom: '10px' }} offset={6} span={14}>
                  {formik.errors.profilePicture && formik.touched.profilePicture && <div style={{ color: 'red' }}>{formik.errors.profilePicture}</div>}
                </Col>
              </Row>





              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal bodyStyle={{ overflow: 'auto', maxHeight: '70vh' }} title={<h3 style={{ textAlign: 'center' }}>User posts</h3>} width={1000} open={openUserPostsModalOpen} onCancel={() => { setOpenUserPostsModalOpen(false) }} footer="" >

            <Row style={{marginTop:'15px'}}>
             
             <Post setOpenUserCommentsModalOpen={setOpenUserCommentsModalOpen} />
             <Post/>
             <Post/>
             <Post/>
             <Post/>
             <Post/>
             <Post/>
             <Post/>
             

            </Row>

          </Modal>
          <Modal bodyStyle={{ overflow: 'auto', maxHeight: '70vh' }} title={<h3 style={{ textAlign: 'center' }}>Comments</h3>} open={openUserCommentsModalOpen} onCancel={() => {setOpenUserCommentsModalOpen(false)}} footer="" >
          <Row style={{marginTop:'15px'}}>

             <Comment/>



            </Row>

            <Row style={{display:'flex',columnGap:'10px',marginTop:'20px'}}>
              <Col span={20}>
                
              <Input placeholder="Type a comment:" />
              </Col>
              <Col>
              <Button type="primary">Add</Button>
              </Col>
            </Row>


          </Modal>

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
                  <EditOutlined onClick={() => { setIsUserDetailModelOpen(true) }} key="edit" />,
                  <FileImageOutlined onClick={() => { setOpenUserPostsModalOpen(true) }} />,
                ]}
              >
                <Meta
                  title={<h3 style={{ textAlign: 'center' }}>{user.userObject.username}</h3>}
                  description={<p style={{ textAlign: 'center' }}>{user.userObject.bio}</p>}
                />
              </Card>
            </Col>
          </Row>
        </>
        : <></>
      }

    </Col>

  )
}

export default UserDetails