import React, { Component } from 'react';

import BandItem from './BandItem';

class BandList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: '0px',
      children: 0
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.setCenter);
    this.setState(() => ({ children: this.props.bands.length }));
    this.setCenter();
  };
  componentDidUpdate = () => {
    if (this.props.bands.length !== this.state.children) {
      this.setState(() => ({
        children: this.props.bands.length
      }));
      this.setState(() => ({
        left: parseInt(this.state.left.slice(0, -2)) - 210 + 'px'
      }));
    }
  };
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setCenter);
  };
  setCenter = () => {
    this.setState(() => ({
      left: window.innerWidth / 2 - this.props.bands.length * 210 + 105 + 'px'
    }));
  };
  render() {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          top: '5rem',
          marginBottom: '1rem',
          left: this.state.left,
          position: 'absolute',
          transition: 'left, 1s'
        }}
      >
        {this.props.bands.map(band => (
          <BandItem key={band.name} name={band.name} url={band.url} points={band.points}/>
        ))}
      </div>
    );
  }
}

export default BandList;
