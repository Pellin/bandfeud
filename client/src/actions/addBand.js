import setMessage from './setMessage';

const addBand = (name, url, turn) => async dispatch => {
  if (turn === 'computer') {
    const response = await fetch(`/api/getimg?name=${name}`);
    let imageUrl = await response.json();
    if (!imageUrl.match(/^.*spacer\.gif$/)) {
      url = imageUrl;
    }
  }

  if (url.match(/^.*spacer\.gif$/)) {
    url = '/images/bandFeud_logo2.svg';
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
      dispatch({ type: 'ADD_BAND', name, url });
      setTimeout(() => {
        dispatch(setMessage('Correct!'));
        setTimeout(() => {
          dispatch(setMessage('Get ready...'));
        }, 1500);
      }, 300);
    }, 1);
  }
};

export default addBand;
