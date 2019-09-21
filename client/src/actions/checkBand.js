import addBand from './addBand';
import getBand from './getBand';
import setMessage from './setMessage';
import { gameOver } from './gameStatus';
import { addToScore } from './addToScore';
import theFix from '../utils/theFix';
import calcExtraPoints from '../utils/calcExtraPoints';

const checkBand = (band, previous, used, bandBank, score, difficulty) => async (
  dispatch,
  getState
) => {
  dispatch({ type: 'SUBMITTED:_TRUE' });
  previous = theFix(band, previous);

  if (used.includes(band)) {
    return setTimeout(() => {
      dispatch(gameOver("Already used! You're out, Einstein", score));
    }, 250);
  }
  if (band[0] !== previous.previous1 && band[0] !== previous.previous2) {
    return setTimeout(() => {
      dispatch(gameOver('Wrong letter! You lose, punk', score));
    }, 250);
  }

  dispatch(setMessage('Checking...'));
  used.push(band);

  try {
    const reply = await fetch(`/api/checkband?name=${band}`, {
      method: 'POST'
    });
    const checkedBand = await reply.json();
    const previous = checkedBand.name[checkedBand.name.length - 1];
    const state = getState();
    const extraPoints = calcExtraPoints(checkedBand.name, difficulty);
    dispatch(addToScore(state.currentPoints + extraPoints));
    dispatch(getBand(previous, used, bandBank));
    dispatch(addBand(checkedBand.name, checkedBand.imgUrl, 'user'));
    return;
  } catch (e) {
    return setTimeout(() => {
      dispatch(gameOver('Not in database! GAME OVER.', score));
    }, 250);
  }
};

export default checkBand;
