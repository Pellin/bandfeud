import React, { Component } from 'react';

class Points extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      timeout: undefined
    };
  }
  componentDidMount = () => {
    this.setState(() => ({
      timeout: setTimeout(() => {
        this.setState(() => ({ show: false }));
      }, 400)
    }));
  };
  componentWillUnmount = () => {
    clearTimeout(this.state.timeout);
  };
  render() {
    return (
      <>
        {this.props.points && (
          <div className={this.state.show ? 'points' : 'points-hide'}>
            +{this.props.points}
          </div>
        )}
      </>
    );
  }
}

export default Points;
