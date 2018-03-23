import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavBar, InputItem, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import AvatarSelector from '../../components/Avatar-Selector/Avatar-Selector';
import { upDate } from '../../redux/user.redux';

@connect(state => state.user, { upDate })

class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      title: '',
      company: '',
      money: '',
      desc: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  onSubmit() {
    this.props.upDate(this.state);
  }
  render() {
    const pathname = this.props.location.pathname;
    const redirect = this.props.redirect;
    return (
      <div>
        {redirect && pathname !== redirect ? <Redirect to={this.props.redirect}></Redirect> : null}
        <NavBar mode='dark'>boss完善信息页面</NavBar>
        <WingBlank size='md'>
          <AvatarSelector selectAvatar={v => this.onChange('avatar', v)}></AvatarSelector>
          <InputItem onChange={v => this.onChange('title', v)}>招聘职位</InputItem>
          <InputItem onChange={v => this.onChange('company', v)}>公司名称</InputItem>
          <InputItem onChange={v => this.onChange('money', v)}>职位薪资</InputItem>
          <TextareaItem title='职位简介' rows={3} onChange={v => this.onChange('desc', v)}></TextareaItem>
          <WhiteSpace />
          <Button onClick={this.onSubmit} type='primary'>提交补全信息</Button>
        </WingBlank>
      </div>
    )
  }
}

export default BossInfo;