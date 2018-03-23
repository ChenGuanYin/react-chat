import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
import { getChatId } from '../../unit'
@connect(state => state, { getMsgList, sendMsg, recvMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showEmoji: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.chat.chatMsg.length === 0) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }
  handleSubmit() {
    if (!this.state.text) return;
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg(from, to, msg)
    this.setState({ text: '' });
  }
  fixedCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  render() {
    const Item = List.Item;
    const id = this.props.match.params.user;
    const users = this.props.chat.users;
    if (!users[id]) {
      return null
    }
    const chatid = getChatId(this.props.user._id, id);
    const chatMsg = this.props.chat.chatMsg.filter(v => v.chatid === chatid)
    const emoji = '😄  😃  😀  😊  😉  😍  😘  😚  😗  😙  😜 😝  😛  😳  😁  😔  😌  😒  😞  😣  😢  😂  😭 😪  😥  😰  😅  😓  😩  😫  😨  😱  😠  😡  😤 😖  😆  😋  😷  😎  😴  😵  😲  😟  😦  😧  😈 👿  😮  😬  😐  😕  😯  😶  😇  😏  😑  😺  😸 😻  😽  😼  🙀  😿  😹  😾  👹  👺 👂 👀 👃 👅 👄 👍 👎 👌 👊 ✊ ✌ 👋 ✋ 👐 👆 👇 👉 👈 🙌 🙏 ☝ 👏 💪 🚶 🏃 💃 👫 👪 👬 👭 💏 💑👯 🙆 🙅 💁 🙋 💇 💅 👰 🙎 🙍 🙇 🎩 👑 👒👟 👞 👡  👠 👢 👕 👔 👚 👗 🎽 👖 👘 👙 💼 👜 👝 👛 👓 🎀 🌂 💄 💋 👣 💎 💍 '
      .split(' ').filter(v => v).map(v => ({ text: v }))
    console.log(chatid)
    console.log(this.props.chat.chatMsg)
    console.log(chatMsg)

    return (
      <div id='chat-page'>
        <NavBar
          leftContent={<Icon type='left'></Icon>}
          onLeftClick={() => { this.props.history.goBack(); }}
        >{users[id].name}</NavBar>
        {chatMsg.map((v, i) => {
          const avatar = require(`../../components/img/${users[v.from].avatar}.png`)
          return (
            <List key={i}>
              {v.from === id ? <Item
                thumb={avatar}
              >{v.content}</Item>
                : (
                  <Item
                    className="chat-me"
                    extra={<img src={avatar} alt='头像' />}
                  >{v.content}</Item>
                )}
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={(v) => { this.setState({ 'text': v }) }}
              extra={<div>
                <span role="img" aria-labelledby='😄'
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    this.setState({
                      showEmoji: !this.state.showEmoji
                    })
                    this.fixedCarousel();
                  }}>😄</span>
                <span onClick={this.handleSubmit}>发送</span>
              </div>}
            >信息</InputItem>
          </List>
          {this.state.showEmoji ? <Grid
            data={emoji}
            isCarousel
            columnNum={9}
            carouselMaxRow={4}
            onClick={el => {
              this.setState({
                text: this.state.text + el.text
              })
              this.fixedCarousel();
            }}
          /> : null}

        </div>
      </div>
    )
  }
}
export default Chat;