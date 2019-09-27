import React, { Component } from 'react';

class Points extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState(() => ({ show: false }));
    }, 500);
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
