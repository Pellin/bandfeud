export default ( state = false, action ) => {
  switch (action.type) {
    case 'HIGHSCORE:_TRUE':
      return true;
    case 'HIGHSCORE:_FALSE':
      return false;
    default:
      return state;
  }
}