import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { register } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'

@connect(
    state => state.user,
    {register}
)
class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius' // boss
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val){
        this.setState({
            [key]: val
        })
    }

    handleRegister(){
        this.props.register(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                { this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null }
                <Logo />
                <WingBlank>
                    <List>
                        { this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null }
                        <InputItem
                            onChange={v => {this.handleChange('user', v)}}
                        >用户名</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type="password"
                            onChange={v => {this.handleChange('pwd', v)}}
                        >密码</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type="password"
                            onChange={v => {this.handleChange('repeatpwd', v)}}
                        >确认密码</InputItem>
                         <WhiteSpace />
                        <RadioItem 
                            checked={this.state.type === 'genius'}
                            onChange={() => {this.handleChange('type','genius')}}
                        >牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={() => {this.handleChange('type','boss')}}
                        >BOSS
                        </RadioItem>
                    </List>
                       
                        <WhiteSpace />
                        <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register