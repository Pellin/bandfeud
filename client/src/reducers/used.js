export default function(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_USED':
      return [...state, action.payload];
    case 'RESET_USED':
      return [];
    default:
      return state;
  }
}
