import React from 'react';
import propTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
@withRouter

@connect(state => state.chat)
class FooterLink extends React.Component {
  static propTypes = {
    data: propTypes.array.isRequired
  }
  render() {
    const navList = this.props.data;
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            badge={v.path === '/message' ? this.props.unRead : null}
            title={v.title}
            key={v.path}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={this.props.location.pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path);
            }}
          ></TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default FooterLink;