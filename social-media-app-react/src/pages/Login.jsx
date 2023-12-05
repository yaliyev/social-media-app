
import React from 'react'
import { Button, Checkbox, Col, Form, Input, Row,Typography  } from 'antd';


const Login = () => {
  return (
   
      <Col style={{marginTop:'200px'}} span={8} offset={8}>

        <Typography.Title style={{transform:'translateX(53%)',color:'white'}} >Login</Typography.Title>

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
    onFinish={()=>{}}
    onFinishFailed={()=>{}}
    autoComplete="off"
  >
    
    <Form.Item
      label={<label style={{color:'white',fontSize:'20px'}}>Username</label>}
      name="username"
    >
      <Input />
    </Form.Item>

    <Form.Item
      label={<label style={{color:'white',fontSize:'20px'}}>Password</label>}
      name="password"
    >
      <Input.Password />
    </Form.Item>

 

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

      </Col>
   
  )
}

export default Login