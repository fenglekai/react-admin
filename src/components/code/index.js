import React, { Component } from "react";
// antd
import { Button, message } from 'antd';
// API
import { GetCode } from "../../api/account"
// 验证
import { validate_email } from "../../utils/validate";
// 定时器
let timer = null;
// class 组件
class Code extends Component {
    constructor(props){
        // 初始化 props 的值
        super(props);
        this.state = {
            username: props.username,
            button_text: "获取验证码",
            button_loading: false,
            button_disabled: false,
            module: props.module
        }
    }
    // this.props.username 每次都会去获取
    componentWillReceiveProps({username}){
        this.setState({
            username //数据的变量和key是相同的情况，只用一个就可以
        })
    }
    componentWillUnmount(){
        clearInterval(timer);
    }
    /** 
     * 获取验证码 
     */
    getCode = () => {
        const username = this.state.username;
        if (!username) {
            message.warning("用户名不能为空！",1);
            return false;
        }
        if (!validate_email(username)) {
            message.warning("邮箱格式不正确",1);
            return false;
        }
        this.setState({
            button_loading: true,
            button_text: "发送中"
        })
        const requestDate = {
            username,
            module: this.state.module
        }
        GetCode(requestDate).then(response => {
            message.success(response.data.message);
            // 执行倒计时
            this.countDown();
        }).catch(error => {
            this.setState({
                button_loading: false,
                button_text: "重新发送",
                button_disabled: false
            })
        })
    }
    /**
     *  倒计时 
     */
    countDown = () => {
        // 倒计时时间
        let sec = 60;
        // 修改状态
        this.setState({
            button_loading: false,
            button_disabled: true,
            button_text: `${sec}S`
        })
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    button_disabled: false,
                    button_text: "重新获取"
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                button_text: `${sec}S`
            })
        },1000)
        // setInterval \ clearInterval  不间断定时器
        // setTimeout \ clearTimeout    只执行一次
    }

    render(){
        const { button_text, button_loading, button_disabled } = this.state
        return <Button type="danger" disabled={button_disabled} loading={button_loading} block onClick={this.getCode}>{button_text}</Button>
    }
}

export default Code;