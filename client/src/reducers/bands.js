export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_BAND':
      return [
        ...state,
        {
          name: action.name,
          url: action.url,
          id: action.discogsId,
          points: action.points
        }
      ];
    case 'RESET_BANDS':
      return [];
    default:
      return state;
  }
};
