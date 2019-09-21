export default (state = 0, action) => {
  switch (action.type) {
    case 'SET_CURRENT_POINTS':
      return action.payload;
    default:
      return state;
  }
};
