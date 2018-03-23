
import axios from 'axios';

const USER_LIST = 'USER_LIST';
const ERROR_MSG = 'ERROR_MSG';
const chatUser = {
  userList: []
}

export function list (state = chatUser, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state, msg: '', userList: action.data };
    case ERROR_MSG:
      return { ...state, msg: action.msg }
    default:
      return state
  }
}
// 用户列表
function userList(data) {
  return { data, type: USER_LIST }
}
// 错误消息的action
function errormsg(msg) {
  return { msg, type: ERROR_MSG };
}
export function getUserList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(userList(res.data.data))
      } else {
        dispatch(errormsg(res.data.msg))
      }
    })
  }
}