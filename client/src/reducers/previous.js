import firstPrevious from '../utils/firstPrevious';

const letter = firstPrevious();

export default (state = { previous1: letter, previous2: '' }, action) => {
  let previous2;

  if (action.type === 'SET_PREVIOUS' && action.payload.length > 1) {
    if (
      action.payload[action.payload.length - 2].match(/1/) &&
      action.payload[action.payload.length - 1].match(/[0-9]/)
    ) {
      switch (
        action.payload.slice(action.payload.length - 2, action.payload.length)
      ) {
        case '12':
          previous2 = 'e';
          break;
        case '20':
          previous2 = 'y';
          break;
        default:
          previous2 = 'n';
      }
    } else if (action.payload[action.payload.length - 1].match(/[0-9]/)) {
      switch (action.payload[action.payload.length - 1]) {
        case '0':
          previous2 = 'o';
          break;
        case '1':
          previous2 = 'e';
          break;
        case '2':
          previous2 = 'o';
          break;
        case '3':
          previous2 = 'e';
          break;
        case '4':
          previous2 = 'r';
          break;
        case '5':
          previous2 = 'e';
          break;
        case '6':
          previous2 = 'x';
          break;
        case '7':
          previous2 = 'n';
          break;
        case '8':
          previous2 = 'h';
          break;
        case '9':
          previous2 = 'e';
          break;
        default:
          previous2 = '';
      }
    }
  }
  switch (action.type) {
    case 'SET_PREVIOUS':
      return {
        ...state,
        previous1: action.payload[action.payload.length - 1],
        previous2
      };
    default:
      return state;
  }
};
