import setMessage from './setMessage';

const addBand = (name, url, turn, points) => async dispatch => {
  if (turn === 'computer') {
    const response = await fetch(`/api/getimg?name=${name}`);
    let imageUrl = await response.json();
    if (!imageUrl.match(/^.*spacer\.gif$/)) {
      url = imageUrl;
    }
  }

  if (url.match(/^.*spacer\.gif$/)) {
    url = '/images/bandFeud_logo.svg';
  }

  if (turn === 'computer') {
    return setTimeout(() => {
      dispatch({ type: 'ADD_BAND', name, url });
      setTimeout(() => {
        dispatch({ type: 'SUBMITTED:_FALSE' });
        dispatch(setMessage(''));
      }, 500);
    }, 1);
  } else {
    return setTimeout(() => {
      dispatch({ type: 'ADD_BAND', name, url, points });
      let message;
      if (points < 20) {
        message = 'Correct!';
      } else if (points > 19 && points < 25) {
        message = 'Good!';
      } else if (points > 24 && points < 30) {
        message = 'Great!';
      } else if (points > 29 && points < 40) {
        message = 'Fantastic!!';
      } else if (points > 39) {
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
