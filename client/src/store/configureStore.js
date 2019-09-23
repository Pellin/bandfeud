import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import bandBankReducer from '../reducers/bandBank';
import bandsReducer from '../reducers/bands';
import currentPointsReducer from '../reducers/currentPoints';
import difficultyReducer from '../reducers/difficulty';
import gameStatusReducer from '../reducers/gameStatus';
import highscoreReducer from '../reducers/highscores';
import isHighscoreReducer from '../reducers/isHighscore';
import messageReducer from '../reducers/message';
import osReducer from '../reducers/os';
import previousReducer from '../reducers/previous';
import scoreReducer from '../reducers/score';
import showGameOverReducer from '../reducers/showGameOver';
import submitReducer from '../reducers/submitted';
import usedReducer from '../reducers/used';

export default () => {
  const store = createStore(
    combineReducers({
      bandBank: bandBankReducer,
      bands: bandsReducer,
      currentPoints: currentPointsReducer,
      difficulty: difficultyReducer,
      highscores: highscoreReducer,
      inGame: gameStatusReducer,
      isHighscore: isHighscoreReducer,
      message: messageReducer,
      os: osReducer,
      previous: previousReducer,
      score: scoreReducer,
      showGameOver: showGameOverReducer,
      submitted: submitReducer,
      used: usedReducer
    }),
    compose(applyMiddleware(thunk))
  );

  return store;
};
