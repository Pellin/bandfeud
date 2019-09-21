export default function(state = false, action) {
  switch (action.type) {
    case 'GAME_ON':
      return true;
    case 'GAME_OVER':
      return false
    default:
      return state;
  }
}
