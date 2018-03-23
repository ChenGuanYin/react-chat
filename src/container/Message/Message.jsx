import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(state => state)

class Message extends React.Component {
  getLast(v) {
    return v[v.length - 1]
  }
  render() {
    if (!this.props.chat.chatMsg.length) return null;
    const msgGroup = {};
    this.props.chat.chatMsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v)
    });
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aLast = this.getLast(a).create_time;
      const bLast = this.getLast(b).create_time;
      return bLast - aLast;
    })
    const Item = List.Item;
    const Brief = Item.Brief;
    return (
      <div>
        {chatList.map(v => {
          const lastInfo = this.getLast(v);
          const targetId = this.props.user._id === v[0].from ? v[0].to : v[0].from;
          const userList = this.props.chat.users;
          const unRead = v.filter(v => !v.read && v.to === this.props.user._id).length;
          return (
            <List key={lastInfo._id}>
              <Item
                thumb={require(`../../components/img/${userList[targetId].avatar}.png`)}
                onClick={(item) => { this.props.history.push(`/chat/${targetId}`); }}
                extra={<Badge text={unRead}></Badge>}
                arrow='horizontal'
              >{lastInfo.content}
                <Brief>{userList[targetId].name}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Message;