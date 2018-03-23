import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile'
import propTypes from "prop-types";

class AvatarSelector extends Component {
  static propTypes  = {
    selectAvatar:  propTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',').map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }));
    const GridHeader = this.state.icon ?
      (<div>
        <span style={{ verticalAlign: 'middle' }}>已选择头像</span>
        <img src={this.state.icon} alt={this.state.icon} style={{ width: 20, verticalAlign: 'middle', paddingLeft: 10 }} />
      </div>) : <div>请选择头像</div>
    return (
      <List
        renderHeader={GridHeader}
      >
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={elm => {
            this.setState(elm);
            this.props.selectAvatar(elm.text)
          }}
        ></Grid>
      </List>
    )
  }
}

export default AvatarSelector;