import addBand from './addBand';
import getBand from './getBand';
import setMessage from './setMessage';
import { gameOver } from './gameStatus';
import { addToScore } from './addToScore';
import addDbBand from '../utils/addDbBand';
import getClientProxy from '../utils/getClientProxy';
import calcExtraPoints from '../utils/calcExtraPoints';

const checkBand = (band, previous, used, score, difficulty) => async (
  dispatch,
  getState
) => {
  dispatch({ type: 'SUBMITTED:_TRUE' });
  if (
    used.includes(band) ||
    used.includes(`the ${band}`) ||
    used.includes(band.slice(4))
  ) {
    return setTimeout(() => {
      dispatch({ type: 'ADD_FAILED_BAND', payload: {name: band, mode: 'Already used'}})
      dispatch(gameOver('Already used!', score));
    }, 250);
  }

  if (band.match(/^the /)) {
    if (band[4] !== previous.previous1 && band[4] !== previous.previous2) {
      return setTimeout(() => {
        dispatch({ type: 'ADD_FAILED_BAND', payload: {name: band, mode: 'Wrong letter'}})
        dispatch(gameOver('Wrong letter!', score));
      }, 250);
    }
  } else if (band[0] !== previous.previous1 && band[0] !== previous.previous2) {
    return setTimeout(() => {
      dispatch({ type: 'ADD_FAILED_BAND', payload: { name: band, mode: 'Wrong letter'}})
      dispatch(gameOver('Wrong letter!', score));
    }, 250);
  }

  dispatch(setMessage('Checking...'));

  try {
    const reply = await fetch(
      `/api/checkband?name=${encodeURIComponent(band)}`
    );
    const checkedBand = await reply.json();
   
    used.push(band);
    addDbBand(checkedBand.name, checkedBand.imgUrl, checkedBand.discogsId);

    if (checkedBand.name !== band) {
      used.push(checkedBand.name);
    }
    let previous;
    let proxy;
    if (
      checkedBand.name[checkedBand.name.length - 1].match(
        /[áàâäåæéèêëìíïóòôøöùúü]/
      )
    ) {
      proxy = getClientProxy(checkedBand.name);
      if (proxy[proxy.length - 1].match(/[a-z0-9]/)) {
        previous = proxy[proxy.length - 1];
      } else {
        previous = proxy[proxy.length - 2];
      }
    } else if (checkedBand.name.match(/.*\W{2,}/)) {
      const proxy = checkedBand.name.match(/[a-z0-9\s]/g);
      previous = proxy[proxy.length - 1];
    } else {
      if (checkedBand.name[checkedBand.name.length - 1].match(/[a-z0-9]/)) {
        previous = checkedBand.name[checkedBand.name.length - 1];
      } else {
        previous = checkedBand.name[checkedBand.name.length - 2];
      }
    }

    const state = getState();
    const extraPoints = calcExtraPoints(
      state.currentPoints,
      checkedBand.name,
      difficulty,
      state.os
    );
    const totalPoints = state.currentPoints + extraPoints;

    dispatch(addToScore(totalPoints));
    dispatch(getBand(previous, used));
    dispatch(
      addBand(
        checkedBand.name,
        checkedBand.imgUrl,
        checkedBand.discogsId,
        'user',
        totalPoints
      )
    );
    return;
  } catch (e) {
 
    return setTimeout(() => {
      dispatch({ type: 'ADD_FAILED_BAND', payload: { name: band, mode: 'No match'}})
      dispatch(gameOver('Sorry, no match.', score));
    }, 250);
  }
};

export default checkBand;
