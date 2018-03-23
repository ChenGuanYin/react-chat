import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { logOut } from '../../redux/user.redux';

@connect(state => state.user, { logOut })
class User extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
    const alert = Modal.alert;
    alert('注销', '确定注销吗???', [
      { text: '取消' },
      {
        text: '确定', onPress: () => {
          browserCookies.erase('userid');
          this.props.logOut();
          this.props.history.push('/login');
        }
      }
    ])
  }
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../../components/img/${props.avatar}.png`)} alt='头像' style={{ width: 50 }} />}
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        ></Result>
        <List renderHeader={() => '简介'}>
          <Item>
            {props.title}
            {props.desc && props.desc.split(',').map((v, i) => (
              <Brief key={i}>{v}</Brief>
            ))}
          </Item>
        </List>
        <WhiteSpace />
        <Button type='primary' onClick={this.onLogout}>注销登录</Button>
      </div>

    ) : null;
  }
}
export default User;