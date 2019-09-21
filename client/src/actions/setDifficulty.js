const setDifficulty = usedLength => {
  return {
    type: 'SET_DIFFICULTY',
    payload: usedLength
  };
};

const resetDifficulty = () => {
  return {
    type: 'RESET_DIFFICULTY'
  };
};

export { setDifficulty, resetDifficulty };
