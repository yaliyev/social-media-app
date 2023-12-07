
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserSchema } from '../validation/loginUserValidation';
import { useFormik } from 'formik';
import { getUser, isExist, login } from '../services/api/user_request';
import { useDispatch, useSelector } from 'react-redux';
import { sign_in } from '../redux/slices/userSlice';
const Login = () => {

  
  let user = useSelector((state)=>state.user.user);

  
  let dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(()=>{
     if(user.userObject != null){
      navigateTo("/user")
     }
  },[user.userObject])

  const formik = useFormik({
    initialValues: {
      'username': '',
      'password': ''
    },
    onSubmit: async (values, actions) => {

      const user = {
        username: values.username,
        password: values.password
      }

      const loginUserResult = await login(user);
      
      if(loginUserResult){
        const userFullData = await getUser(user);
        dispatch(sign_in(userFullData));
        Swal.fire({
          icon: "success",
          title: "Login",
          html: "User has been logined",
          timer: 1600
        }).then(()=>{
          localStorage.setItem("social-media-app-yagub-user-status",JSON.stringify({username:userFullData.username}));
          navigateTo("/user");
        })
      }else{
        Swal.fire({
          icon: "error",
          title: "Login",
          html: "User's username and password are invalid",
          timer: 1300
        })
      }


    },
    validationSchema: loginUserSchema
  })

  return (

    <Col style={{ marginTop: '200px' }} span={8} offset={8}>

      <Row>
        <Col span={10} offset={12}>
          <Typography.Title style={{ marginLeft: '10px', color: 'white' }} >Login</Typography.Title>
        </Col>
      </Row>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >

        <Form.Item
          label={<label style={{ color: 'white', fontSize: '20px' }}>Username</label>}
          name="username"
        >
          <Input name='username' value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} />

        </Form.Item>
        <Row>
          <Col style={{ marginTop: '-20px', marginBottom: '10px' }} offset={8} span={4}>
            {formik.errors.username && formik.touched.username && <div style={{ color: 'red' }}>{formik.errors.username}</div>}
          </Col>
        </Row>

        <Form.Item
          label={<label style={{ color: 'white', fontSize: '20px' }}>Password</label>}
          name="password"
        >
          <Input.Password name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        </Form.Item>
        <Row>
          <Col style={{ marginTop: '-20px', marginBottom: '10px' }} offset={8} span={16}>
            {formik.errors.password && formik.touched.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
          </Col>
        </Row>



        <Form.Item
          wrapperCol={{
            offset: 14,
            span: 3,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>


      <Row>
        <Col offset={8} span={16}>
          <Typography style={{ color: 'white' }}>If you do not have account? You can <Link to={"/register"}>Create Account</Link>  </Typography>
        </Col>
      </Row>


    </Col>

  )
}

export default Login