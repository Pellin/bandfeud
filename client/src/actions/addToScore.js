const addToScore = points => {
  return {
    type: 'ADD_TO_SCORE',
    payload: points
  };
};

const resetScore = () => {
  return {
    type: 'RESET_SCORE'
  };
};

export { addToScore, resetScore };
