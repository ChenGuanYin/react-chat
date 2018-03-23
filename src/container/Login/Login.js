import React from 'react';
import { WingBlank, WhiteSpace, Button, List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import { login } from '../../redux/user.redux';
import WrapperForm from '../../components/Wrapper-Component/Wrapper-component';

@connect(
  state => state.user,
  { login }
)
@WrapperForm
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.goRegister = this.goRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  };
  goRegister() {
    this.props.history.push('/register');
  }
  handleLogin() {
    this.props.login(this.props.state);
  }
  render() {
    return (
      <div>
        {this.props.redirect && this.props.redirect !== '/login' ? <Redirect to={this.props.redirect}></Redirect> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='err-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <InputItem onChange={v => this.props.handleChange('password', v)} type='password'>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.handleLogin}>登录按钮</Button>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.goRegister}>注册按钮</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login;