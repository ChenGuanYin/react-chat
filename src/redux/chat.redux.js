import axios from 'axios';
import socket from 'socket.io-client';


const io = socket('ws://localhost:6063');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const READ_MSG = 'READ_MSG';

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
    case READ_MSG:
      const { from, to, num } = action.data;
      return {
        ...state,
        unRead: state.unRead - num,
        chatMsg: state.chatMsg.map(v => {
          if (v.from === from && v.to === to) {
            return { ...v, read: true };
          } else {
            return v;
          }
        })
      }
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
function redMsg(data) {
  return { data, type: READ_MSG };
}
// 发送数据
export function sendMsg(from, to, msg) {
  return dispatch => {
    io.emit('sendMsg', { from, to, msg });
  }
}
export function setReadMsg(from) {
  return (dispatch, getState) => {
    const to = getState().user._id;
    axios.post('/chat/setReadMsg', { from }).then(res => {
      if(res.status === 200&& res.data.code === 0){
        dispatch(redMsg({ from, to, num: res.data.num }))
      }
    })
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
        const userid = getState().user._id;
        dispatch(msgList(res.data.data, userid))
      }
    })
  }
}