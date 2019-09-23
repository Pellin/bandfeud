export default (state = false, action) => {
  switch (action.type) {
    case 'SHOW_GAME_OVER':
      return true;
    case 'HIDE_GAME_OVER':
      return false;
    default:
      return state;
  }
};
