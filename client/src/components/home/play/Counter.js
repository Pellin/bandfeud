import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { gameOver } from '../../../actions/gameStatus';
import setCurrentPoints from '../../../actions/setCurrentPoints';

export const Counter = ({
  difficulty,
  inGame,
  score,
  submitted,
  onGameOver,
  onSetCurrentPoints
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    setTimeLeft(difficulty);
  }, [difficulty]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && inGame && !submitted) {
        setTimeLeft(timeLeft - 1);
      } else {
        onGameOver("Time's up, snailfinger.", score);
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
      onSetCurrentPoints(timeLeft);
    };
  });
  return <div className="counter">{timeLeft > 0 && timeLeft}</div>;
};

const mapDispatchToProps = dispatch => ({
  onGameOver: (message, score) => dispatch(gameOver(message, score)),
  onSetCurrentPoints: timeLeft => dispatch(setCurrentPoints(timeLeft))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Counter);
