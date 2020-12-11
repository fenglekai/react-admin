import React, { Component, Fragment } from 'react';
// ANTD
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, BarcodeOutlined  } from '@ant-design/icons';
// 验证
import { validate_password } from "../../utils/validate";
// API
import { Login } from "../../api/account";

class LoginForm extends Component{
    constructor(){
        super();
        this.state = {};
    }

    onFinish = (values) => {
        Login()
        .then(response => { //Promise.resolves
            console.log(process.env.NODE_ENV)
            console.log(response)
        }).catch(error => { //Promise.reject

        })
        console.log('Received values of form: ', values);
    };

    toggleForm = () => {
        //调用父级的方法
        this.props.switchForm('register');
    }

    render(){
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>帐号注册</span>
                </div>
                <div className="form-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={
                                [
                                    { required: true, message: '邮箱不能为空' },
                                    { type: 'email', message: '邮箱格式不正确'}
                                ]
                            }
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={
                                [
                                    { required: true, message: '密码不能为空' },
                                    // ({ getFieldValue }) => ({  //ES6解构
                                    //     validator(rule, value) {
                                    //         if (value.length < 6) {
                                    //             // return Promise.resolve();
                                    //             return Promise.reject('不能小于6位');
                                    //         }else{
                                    //             return Promise.resolve();
                                    //         }
                                    //         // return Promise.reject('The two passwords that you entered do not match!');
                                    //     },
                                    // }),
                                    // { min: 6, message: '不能小于6位'},
                                    // { max: 20, message: '不能大于20位'},
                                    { pattern: validate_password, message: '请输入大于6位小于20位的数字+字母'}
                                ]
                            }>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={
                                [
                                    { required: true, message: '验证码不能为空' },
                                    { len: 6, message: '请输入长度为6位的验证码' }
                                ]
                            }>
                            <Row gutter={13}>
                                <Col span={15}>
                                <Input prefix={<BarcodeOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Button type="danger" block>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );}
}

export default LoginForm;