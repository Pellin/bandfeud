export default function(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_BANDBANK':
      return [...state, ...action.payload];
    case 'UPDATE_BANDBANK':
      return [...action.payload];
    case 'RESET_BANDBANK':
      return [];
    default:
      return state;
  }
}
