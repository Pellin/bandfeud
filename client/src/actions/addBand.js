import setMessage from './setMessage';

// import addProBand from '../utils/addProBand';
// import removeBand from '../utils/removeBand';

const addBand = (name, url, discogsId, turn, points) => async (
  dispatch,
  getState
) => {
  const state = getState();
  if (!state.inGame) return;

  if (turn === 'computer') {
    return setTimeout(() => {
      dispatch({ type: 'ADD_BAND', name, url, discogsId });
      setTimeout(() => {
        dispatch({ type: 'SUBMITTED:_FALSE' });
        dispatch(setMessage(''));
      }, 500);
    }, 1);
  } else {
    return setTimeout(() => {
      dispatch({ type: 'ADD_BAND', name, url, discogsId, points });
      let message;
      if (points < 20) {
        message = 'Correct!';
      } else if (points > 19 && points < 30) {
        message = 'Good!';
      } else if (points > 29 && points < 40) {
        message = 'Great!';
      } else if (points > 39 && points < 50) {
        message = 'Fantastic!!';
      } else if (points > 49) {
        message = 'WORLD CLASS!!!';
      }
      setTimeout(() => {
        dispatch(setMessage(message));
        setTimeout(() => {
          dispatch(setMessage('Get ready...'));
        }, 1500);
      }, 300);
    }, 1);
  }
};

export default addBand;
