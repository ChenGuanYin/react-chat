import React from 'react';
import {connect} from './react-redux';
import {add,minus,timeout, addTwice} from './index.redux';

class App extends React.Component {
  render() {
    return (
      <h2 style={{height: "100%"}}> 
      当前state = {this.props.num}
      <br/>
      <button onClick={() => {this.props.add()}}>增加</button>
      <button onClick={() => {this.props.minus()}}>减小</button>
      <button onClick={() => {this.props.addTwice()}}>延时</button>
      </h2>
    );
  }
}
App = connect(state => ({num: state}), {add,minus,timeout,addTwice})(App)
export default App;
