import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from './test.redux'
// react-redux;

//  connect负责链接组件，给redux的数据放到组件属性里面
// 1、接受一些组件，吧state；离的数据放进去，返回一个组件
// 2、数据变化的时候，通知组件，订阅
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) => (Wrapper) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context);
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      // 获取上下文环境下的store
      const {store} = this.context;
      store.subscribe(() => this.update());
      this.update();
    }
    update() {
      const {store} = this.context;
      // 获取对应的state
      const stateProps = mapStateToProps(store.getState())
      // 执行对应的dispatch
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
    render() {
      return <Wrapper {...this.state.props}></Wrapper>  
    }
  }
}

// Provide,吧store放到context里面，所有的资源数可以直接取到store

export class Provide extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {
      store: this.store
    }
  }
  render() {
    return this.props.children
  }
}