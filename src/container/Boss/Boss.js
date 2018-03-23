import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/list.redux';
import UserCard from '../../components/User-Card/User-Card';

@connect(
  state => state.list,
  { getUserList }
)

class Boss extends React.Component {
  componentWillMount() {
    this.props.getUserList('genius');
  }
  render() {
    return <UserCard userList={this.props.userList}></UserCard>
  }
}

export default Boss;  