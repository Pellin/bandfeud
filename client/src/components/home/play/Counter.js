import React, { Component } from 'react';
import { connect } from 'react-redux';

import { gameOver } from '../../../actions/gameStatus';
import setCurrentPoints from '../../../actions/setCurrentPoints';

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 0,
      intervals: []
    };
  }
  componentDidMount() {
    this.setState(() => ({ timeLeft: this.props.difficulty }));
    this.startCount();
  }
  componentWillUnmount = async () => {
    this.props.onSetCurrentPoints(this.state.timeLeft);
    clearInterval(this.state.intervals);
  };
  startCount = () => {
    const timer = setInterval(async () => {
      if (
        this.state.timeLeft > 0 &&
        this.props.inGame &&
        !this.props.submitted
      ) {
        this.setState(() => ({ timeLeft: this.state.timeLeft - 1 }));
      } else {
        this.props.onGameOver(
          "Time's up, snailfoot. And the game is over.",
          this.props.score
        );
        clearInterval(timer);
      }
    }, 1000);
    this.setState(() => ({ intervals: [...this.state.intervals, timer] }));
  };
  render() {
    return (
      <div className="counter">
        {this.state.timeLeft > 0 && this.state.timeLeft}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onGameOver: (message, score) => dispatch(gameOver(message, score)),
  onSetCurrentPoints: timeLeft => dispatch(setCurrentPoints(timeLeft))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Counter);
