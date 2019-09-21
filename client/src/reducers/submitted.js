export default (state = false, action) => {
  switch (action.type) {
    case 'SUBMITTED:_FALSE':
      return false;
    case 'SUBMITTED:_TRUE':
      return true;
    default:
      return state;
  }
}
