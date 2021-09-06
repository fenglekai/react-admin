import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
// ANTD
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined, BarcodeOutlined } from "@ant-design/icons";
// 验证
import { validate_password } from "../../utils/validate";
// API
import { Login } from "../../api/account";
// 组件
import Code from "../../components/code/index";
// 加密
import CrytoJs from "crypto-js";
// 方法
import { setToken, setUsername } from "../../utils/cookies";
class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      code: "",
      module: "login",
      loading: false,
    };
  }
  // 登录
  onFinish = (values) => {
    const requestData = {
      username: this.state.username,
      password: CrytoJs.MD5(this.state.password).toString(),
      code: this.state.code,
    };
    this.setState({
      loading: true,
    });
    Login(requestData)
      .then((response) => {
        //Promise.resolves
        const data = response.data;
        message.success(data.message);
        this.setState({
          loading: false,
        });
        const dataToken = response.data.data;
        // 存储token
        setToken(dataToken.token);
        setUsername(dataToken.username);
        // 路由跳转
        this.props.history.push("/index");
      })
      .catch((error) => {
        //Promise.reject
        this.setState({
          loading: false,
        });
      });
    // console.log('Received values of form: ', values);
  };
  /** input输入处理 */
  inputChangeUsername = (e) => {
    let value = e.target.value;
    this.setState({
      username: value,
    });
  };
  inputChangePassword = (e) => {
    let value = e.target.value;
    this.setState({
      password: value,
    });
  };
  inputChangeCode = (e) => {
    let value = e.target.value;
    this.setState({
      code: value,
    });
  };
  toggleForm = () => {
    // 调用父级的方法
    this.props.switchForm("register");
  };

  render() {
    const { username, module, loading } = this.state;
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
              rules={[
                { required: true, message: "邮箱不能为空" },
                { type: "email", message: "邮箱格式不正确" },
              ]}
            >
              <Input
                value={username}
                onChange={this.inputChangeUsername}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "密码不能为空" },
                {
                  pattern: validate_password,
                  message: "请输入大于6位小于20位的数字+字母",
                },
              ]}
            >
              <Input
                onChange={this.inputChangePassword}
                type="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "验证码不能为空" },
                { len: 6, message: "请输入长度为6位的验证码" },
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    onChange={this.inputChangeCode}
                    prefix={<BarcodeOutlined className="site-form-item-icon" />}
                    placeholder="Code"
                  />
                </Col>
                <Col span={9}>
                  <Code username={username} module={module} />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(LoginForm);
