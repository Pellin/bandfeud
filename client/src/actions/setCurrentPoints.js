const setCurrentPoints = timeLeft => {
  return {
    type: 'SET_CURRENT_POINTS',
    payload: timeLeft
  };
};

export default setCurrentPoints;
