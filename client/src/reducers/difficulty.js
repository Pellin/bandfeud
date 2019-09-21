export default function(state = 20, action) {
  let sec;
  if (action.type === 'SET_DIFFICULTY') {
    if (action.payload > 50) {
      sec = 5;
    } else if (action.payload > 30) {
      sec = 10;
    } else if (action.payload > 20) {
      sec = 15;
    } else {
      sec = 20;
    }
  }

  switch (action.type) {
    case 'SET_DIFFICULTY':
      return sec;
    case 'RESET_DIFFICULTY':
      return 20;
    default:
      return state;
  }
}
