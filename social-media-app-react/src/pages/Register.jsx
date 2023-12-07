
import React from 'react'
import Swal from 'sweetalert2'
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { isExist, register } from '../services/api/user_request';
import { registerUserSchema } from '../validation/registerUserValidation';

const Register = () => {

    const navigateTo = useNavigate();
//id, username, fullName, email, password, bio, profilePicture, followers:[], 
//followings:[], requests:[], posts:[], stories:[], isVerified, isPublic, isAdmin
    // username, password, email, confirmPassword, isPublic checkbox, fullName
    const formik = useFormik({
        initialValues: {
            'username': '',
            'password': '',
            'email': '',
            'confirmPassword': '',
            'isPublic': 'false',
            'fullName': '',
        },
        onSubmit: async(values, actions) => {

            let isPublicVal = values.isPublic;
            console.log(isPublicVal);
            
            if(isPublicVal == 'false'){
                isPublicVal = false;
            }else{
                isPublicVal = true;
            }

            const user = {
                username: values.username,
                password: values.password,
                profilePicture: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
                email: values.email,
                isPublic: isPublicVal,
                fullName: values.fullName,
            }

            const isExistResult  = await isExist(user);

            console.log(isExistResult);

            if(!isExistResult.isExistUsername && !isExistResult.isExistEmail){
                const responsePost = await register(user);
 
                if(responsePost.status == 201){
    
                    Swal.fire({
                        icon: "success",
                        title: "Register",
                        html: "User has been registered",
                        timer: 1300
                      }).then(()=>{
                        actions.resetForm()
                        navigateTo("/login");
                      });
                }
            }else{
                if(isExistResult.isExistUsername){
                    Swal.fire({
                        icon: "error",
                        title: "Register",
                        html: `${user.username} is exist already.Try another username`,
                        timer: 1300
                      })
                }
                console.log(user);
                if(isExistResult.isExistEmail){
                    Swal.fire({
                        icon: "error",
                        title: "Register",
                        html: `${user.email} is exist already.Try another email`,
                        timer: 1300
                      })
                }
            }
           

            
        },
        validationSchema: registerUserSchema
    })

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
                    <Col style={{marginTop:'-20px',marginBottom:'10px'}} offset={8} span={4}>
                    {formik.errors.username&&formik.touched.username && <div style={{color:'red'}}>{formik.errors.username}</div>}
                    </Col>
                </Row>
                

                <Form.Item
                    label={<label style={{ color: 'white', fontSize: '20px' }}>Full Name</label>}
                    name="fullName"
                >
                    <Input name='fullName' value={formik.values.fullName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    
                </Form.Item>
                <Row>
                    <Col style={{marginTop:'-20px',marginBottom:'10px'}} offset={8} span={4}>
                    {formik.errors.fullName&&formik.touched.fullName && <div style={{color:'red'}}>{formik.errors.fullName}</div>}
                    </Col>
                </Row>

                <Form.Item
                    label={<label style={{ color: 'white', fontSize: '20px' }}>Email</label>}
                    name="email"
                >
                    <Input name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    
                </Form.Item>
                <Row>
                    <Col style={{marginTop:'-20px',marginBottom:'10px'}} offset={8} span={12}>
                    {formik.errors.email&&formik.touched.email && <div style={{color:'red'}}>{formik.errors.email}</div>}
                    </Col>
                </Row>
                

                <Form.Item
                    label={<label style={{ color: 'white', fontSize: '20px' }}>Password</label>}
                    name="password"
                >
                    <Input.Password name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                </Form.Item>
                <Row>
                    <Col style={{marginTop:'-20px',marginBottom:'10px'}} offset={8} span={16}>
                    {formik.errors.password&&formik.touched.password && <div style={{color:'red'}}>{formik.errors.password}</div>}
                    </Col>
                </Row>

                <Form.Item
                    label={<label style={{ color: 'white', fontSize: '20px' }}>Confirm Password</label>}
                    name="confirmPassword"
                >
                    <Input.Password name='confirmPassword' value={formik.values.confirmPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                </Form.Item>

                <Row>
                    <Col style={{marginTop:'-20px',marginBottom:'10px'}} offset={8} span={16}>
                    {formik.errors.confirmPassword&&formik.touched.confirmPassword && <div style={{color:'red'}}>{formik.errors.confirmPassword}</div>}
                    </Col>
                </Row>

                <Form.Item
                    label={<label style={{ color: 'white', fontSize: '20px' }}>is Public</label>}
                    name="isPublic"
                >
                    <input type='checkbox' onChange={() => {
                        let a = formik.values.isPublic;
                        if (a == 'false') {
                            formik.setFieldValue('isPublic', 'true')
                        } else {
                            formik.setFieldValue('isPublic', 'false')
                        }

                    }} values={formik.values.isPublic} name='isPublic' ></input>
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