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

  if (
    used.includes(band) ||
    used.includes(`the ${band}`) ||
    used.includes(band.slice(4))
  ) {
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

  try {
    const reply = await fetch(`/api/checkband?name=${band}`);
    const checkedBand = await reply.json();
    used.push(band);
    if (checkedBand.name !== band) {
      used.push(checkedBand.name);
    }
    const previous = checkedBand.name[checkedBand.name.length - 1];
    const state = getState();
    const extraPoints = calcExtraPoints(checkedBand.name, difficulty);
    const totalPoints = state.currentPoints + extraPoints;
    dispatch(addToScore(totalPoints));
    dispatch(getBand(previous, used, bandBank));
    dispatch(
      addBand(checkedBand.name, checkedBand.imgUrl, 'user', totalPoints)
    );
    return;
  } catch (e) {
    return setTimeout(() => {
      dispatch(gameOver('Not in database! GAME OVER.', score));
    }, 250);
  }
};

export default checkBand;
