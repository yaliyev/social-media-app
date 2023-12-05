
import React from 'react'
import { Button, Checkbox, Col, Form, Input, Row,Typography  } from 'antd';
import { Link } from 'react-router-dom';


const Login = () => {
  return (
   
      <Col style={{marginTop:'200px'}} span={8} offset={8}>

       <Row>
        <Col span={10} offset={12}>
        <Typography.Title style={{marginLeft:'10px',color:'white'}} >Login</Typography.Title>
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

  
  <Row>
    <Col offset={8} span={16}>
    <Typography style={{color:'white'}}>If you do not have account? You can <Link to={"/register"}>Create Account</Link>  </Typography>
    </Col>
  </Row>
  

      </Col>
   
  )
}

export default Login