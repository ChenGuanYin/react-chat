import React from 'react';
import Logo from '../../components/logo/Logo'
import { WingBlank, WhiteSpace, List, InputItem, Button, Radio } from 'antd-mobile';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { register } from '../../redux/user.redux';
import WrapperForm from '../../components/Wrapper-Component/Wrapper-component';

@connect(
  state => state.user,
  { register }
)
@WrapperForm
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  handleRegister() {
    this.props.register(this.props.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirect ? <Redirect to={this.props.redirect}></Redirect> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='err-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <InputItem type='password' onChange={v => this.props.handleChange('password', v)}>密码</InputItem>
            <InputItem type='password' onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem checked={this.props.state.type === 'genius'} onChange={() => this.props.handleChange('type', 'genius')}>大神</RadioItem>
            <RadioItem checked={this.props.state.type === 'boss'} onChange={() => this.props.handleChange('type', 'boss')}>老板</RadioItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Register;