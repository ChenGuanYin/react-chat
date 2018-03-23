import axios from 'axios';
import socket from 'socket.io-client';

const io = socket('ws://localhost:6063');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';

const initState = {
  chatMsg: [],
  users: {},
  unRead: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, chatMsg: action.data, users: action.users, unRead: action.data.filter(v => !v.read && v.to === action.userid).length }
    case MSG_RECV:
      const n = action.data.to === action.userid ? 1 : 0;
      return { ...state, chatMsg: [...state.chatMsg, action.data], unRead: state.unRead + n }
    default:
      return state;
  }
}

function msgList(data, userid) {
  return { userid, data: data.doc, users: data.users, type: MSG_LIST };
}
function msgRecv(data, userid) {
  return { data, userid, type: MSG_RECV }
}
// 发送数据
export function sendMsg(from, to, msg) {
  return dispatch => {
    io.emit('sendMsg', { from, to, msg });
  }
}
// 接受数据
export function recvMsg() {
  return (dispatch, getState) => {
    io.on('recvMsg', function (data) {
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    })
  }
}
// 获取聊天列表
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/chat/getMsgList').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        console.log(getState().user._id)
        const userid = getState().user._id;
        dispatch(msgList(res.data.data, userid))
      }
    })
  }
}