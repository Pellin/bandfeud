export default (state = '', action) => {
  switch (action.type) {
    case 'SET_OS':
      return action.payload;
    default:
      return state;
  }
};
