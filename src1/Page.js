import React from 'react';
import propTypes from 'prop-types';

class Middle extends React.Component {
  render() {
    return (
      <div>Page子元素<Child></Child></div>
    )
  }
}

class Child extends React.Component {
  static contextTypes ={
    name: propTypes.string
  }
  render () {
    return (
      <p>Child组件{this.context.name}</p>  
    )
  }
}

class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      name: '张三'
    }
  }
  getChildContext() {
    return this.state;
  }
  static childContextTypes = {
    name: propTypes.string
  }
  render() {
    return (
      <h2>这是Page页面，名字是{this.state.name}
        <Middle></Middle>
      </h2> 
    )
  }
}
export default Page;