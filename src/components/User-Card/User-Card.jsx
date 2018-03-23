import React from 'react';
import proptypes from 'prop-types';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
  static proptypes = {
    userList: proptypes.array.isRequired
  }
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`);
  }
  render() {
    const { Header, Body, Footer } = Card;
    return (
      <WingBlank size='md'>
        <WhiteSpace />
        {this.props.userList.map(v => (
          v.avatar ? (
            <Card
              key={v.user}
              onClick={() => this.handleClick(v)}
            >
              <Header
                title={v.user}
                thumb={require(`../../components/img/${v.avatar}.png`)}
                extra={v.title}
              ></Header>
              <Body>
                {v.desc && v.desc.split('\n').map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </Body>
              {v.type === 'boss' && (v.money || v.company) ? (
                <Footer
                  content={`公司：${v.company}`}
                  extra={`薪资：${v.money}`}
                ></Footer>
              ) : null}
            </Card>) : null
        ))}
      </WingBlank>
    )
  }
}
export default UserCard;
