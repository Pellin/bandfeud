import setMessage from './setMessage';
import firstPrevious from '../utils/firstPrevious';
import checkIfHighscore from '../utils/checkIfHighscore';

const gameOn = () => dispatch => {
  const letter = firstPrevious();

  dispatch({ type: 'SET_PREVIOUS', payload: letter });
  dispatch({ type: 'GAME_ON' });
  dispatch({ type: 'SUBMITTED:_FALSE' });
};

const gameOver = (message, score) => async dispatch => {
  dispatch(setMessage(message));
  dispatch({ type: 'SHOW_GAME_OVER' });
  dispatch({ type: 'RESET_USED' });
  const highscore = await checkIfHighscore(score);
  if (highscore) {
    setTimeout(() => {
      dispatch({ type: 'HIDE_GAME_OVER' });
      dispatch({ type: 'HIGHSCORE:_TRUE' });
    }, 2500);
  } else {
    setTimeout(() => {
      dispatch(setMessage(''));
      dispatch({ type: 'HIDE_GAME_OVER' });
      dispatch({ type: 'GAME_OVER' });
      dispatch({ type: 'RESET_BANDS' });
      dispatch({ type: 'RESET_SCORE' });
      dispatch({ type: 'RESET_BANDBANK' });
      dispatch({ type: 'RESET_DIFFICULTY' });
    }, 2500);
  }
};

export { gameOn, gameOver };
