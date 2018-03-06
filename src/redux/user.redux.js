import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    redirectTo : '',
    isAuth : false,
    msg : '',
    user : '',
    type : ''
}

// reducer
export function user (state = initState, action){
    switch(action.type) {
        case REGISTER_SUCCESS:
            return { ...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload }
        case LOGIN_SUCCESS:
            return { ...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth:false, msg:action.msg }
        default:
            return state
    }
}

function errorMsg(msg) {
    return {
        msg,
        type : ERROR_MSG
    }
}

function regiserSuccess(data) {
    return {
        type : REGISTER_SUCCESS,
        payload : data
    }
}

function loginSuccess(data) {
    return {
        type : LOGIN_SUCCESS,
        payload : data
    }
}

export function register({ user, pwd, repeatpwd, type }){
    if(!user||!pwd) {
        return errorMsg('用户名密码必须输入')
    }
    if(pwd !== repeatpwd) {
        return errorMsg('密码与确认密码不同')
    }
    return dispath => {
        axios.post('/user/register', {
            user,
            pwd,
            type
        }).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispath(regiserSuccess({user, pwd, type}))
            } else {
                dispath(errorMsg(res.data.msg))
            }
        })
    }
   
}

export function login({ user, pwd }){
    if(!user||!pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispath => {
        axios.post('/user/login', {
            user,
            pwd
        }).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispath(loginSuccess(res.data.data))
            } else {
                dispath(errorMsg(res.data.msg))
            }
        })
    }
}

export function loadData(userinfo){
    return {
        type : LOAD_DATA,
        payload : userinfo
    }
}