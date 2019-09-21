export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_BAND':
      return [
        ...state,
        {
          name: action.name,
          url: action.url
        }
      ];
    case 'RESET_BANDS':
      return [];
    default:
      return state;
  }
};
