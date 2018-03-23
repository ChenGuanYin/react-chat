import React from 'react'

export default function WrapperFrom(Component) {
  return class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(key, val) {
      this.setState({
        [key]: val
      })
    }
    render() {
      return <Component state={this.state} handleChange={this.handleChange} {...this.props}></Component>
    }
  }
}