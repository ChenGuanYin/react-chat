import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavBar, InputItem, WingBlank, WhiteSpace, Button, TextareaItem } from 'antd-mobile'
import { upDate } from '../../redux/user.redux';
import AvatarSelector from '../../components/Avatar-Selector/Avatar-Selector';
@connect(state => state.user, { upDate })

class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    const redirect = this.props.redirect;
    const pathName = this.props.pathname;
    return (
      <div>
        {redirect && redirect !== pathName ? <Redirect to={this.props.redirect}></Redirect> : null}
        <NavBar>大神完善信息页面</NavBar>
        <AvatarSelector selectAvatar={v => this.onChange('avatar', v)}></AvatarSelector>
        <WingBlank size='md'>
          <InputItem
            onChange={v => this.onChange('title', v)}
          >求职岗位</InputItem>
          <TextareaItem
            title='个人简介' rows='3'
            onChange={v => this.onChange('desc', v)}
          ></TextareaItem>
          <WhiteSpace />
          <Button
            type='primary'
            onClick={() => { this.props.upDate(this.state) }}
          >提交补全信息</Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo;