export default function(state = [], action) {
  switch (action.type) {
    case 'SET_HIGHSCORES':
      return [...action.payload];
    default:
      return state;
  }
}
