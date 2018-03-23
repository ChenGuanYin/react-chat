import React from "react";
import { NavBar } from "antd-mobile";
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Boss from '../Boss/Boss';
import Genius from '../Genius/Genius';
import User from '../User/User';
import Message from '../Message/Message';
import FooterLink from '../../components/Footer-Link/Footer-Link';
import { getMsgList, recvMsg } from '../../redux/chat.redux';

@connect(state => state, { getMsgList, recvMsg })
class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }
  render() {
    const path = this.props.location.pathname;
    const navList = [
      {
        path: '/boss',
        title: '牛人列表',
        icon: 'boss',
        text: '牛人',
        component: Boss,
        hide: this.props.user.type === 'genius'
      }, {
        path: '/genius',
        title: 'Boos列表',
        icon: 'job',
        text: 'Boss',
        component: Genius,
        hide: this.props.user.type === 'boss'
      }, {
        path: '/message',
        title: '消息中心',
        icon: 'msg',
        text: '消息',
        component: Message
      }, {
        path: '/user',
        title: '个人中心',
        icon: 'user',
        text: 'user',
        component: User,
      }
    ]
    const filterUrl = (path === '/user' || path === '/message' || path === '/genius' || path === '/boss') ?
      <NavBar>{navList.find(v => path === v.path).title}</NavBar> : null
    return (
      <div>
        {filterUrl}
        <div style={{ marginBottom: 55 }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
            <Redirect to='/login'></Redirect>
          </Switch>
        </div>
        <FooterLink data={navList.filter(v => !v.hide)}></FooterLink>
      </div>
    )
  }
}

export default Dashboard;