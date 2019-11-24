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
    case 'ADD_FAILED_BAND':
      console.log(action.payload.name);
      console.log(action.payload.mode)
      return [
        ...state,
        {
          name: action.payload.name,
          mode: action.payload.mode
        }
      ];
    case 'RESET_BANDS':
      return [];
    default:
      return state;
  }
};
