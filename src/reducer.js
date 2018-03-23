// 合并所有的reducer，并且返回
import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { list } from './redux/list.redux';
import { chat } from './redux/chat.redux'
export default combineReducers({ user, list, chat });