import axios from 'axios';
import { getRedirectPath } from '../unit';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
  redirect: '',
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}
//  reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { password, ...data } = action.data;
      return { ...state, redirect: getRedirectPath(action.data), msg: '', ...data }
    case LOAD_DATA:
      return { ...state, isAuth: true, ...action.data }
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false }
    case LOGOUT:
      return { ...initState, redirect: '/login' }
    default:
      return state;
  }
}
// 注册成功的action
function authSuccess(data) {
  return { data, type: AUTH_SUCCESS };
}
export function logOut() {
  return { type: LOGOUT };
}
// 错误消息的action
function errormsg(msg) {
  return { msg, type: ERROR_MSG };
}
// 查看用户是否登录的action
export function loadData(data) {
  return { data, type: LOAD_DATA }
}
// 注册方法
export function register({ user, password, repeatpwd, type }) {
  if (!password || !user) {
    return errormsg('用户名密码必须输入')
  }
  if (password !== repeatpwd) {
    return errormsg('确认密码和密码必须相同')
  }
  return dispatch => {
    axios.post('/user/register', { user, password, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, password, type }))
      } else {
        dispatch(errormsg(res.data.msg))
      }
    })
  }
}
// 登录方法
export function login({ user, password }) {
  if (!password || !user) {
    return errormsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, password }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errormsg(res.data.msg))
      }
    })
  }
}
// 完善信息
export function upDate(data) {
  return dispatch => {
    axios.post('/user/update', { ...data }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errormsg(res.data.msg))
      }
    })
  }
}