
import React from 'react'
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';


const Register = () => {
    return (

        <Col style={{ marginTop: '200px' }} span={8} offset={8}>

            <Row>
                <Col offset={12} span={10}>
                    <Typography.Title style={{ color: 'white' }} >Register</Typography.Title>
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
                onFinish={() => { }}
                onFinishFailed={() => { }}
                autoComplete="off"
            >

                <Form.Item
                    label={<label style={{ color: 'white', fontSize: '20px' }}>Username</label>}
                    name="username"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<label style={{ color: 'white', fontSize: '20px' }}>Password</label>}
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
                        Register
                    </Button>
                </Form.Item>
            </Form>


            <Row>
                <Col offset={10} span={16}>
                    <Typography style={{ color: 'white' }}>If you  have account? You can <Link to={"/login"}>Login</Link>  </Typography>
                </Col>
            </Row>


        </Col>

    )
}

export default Register