import isHighscoreReducer from '../../reducers/isHighscore';

it('should default state to false', () => {
  const state = isHighscoreReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toBeFalsy();
});

it('should set state to true', () => {
  const state = isHighscoreReducer(false, {
    type: 'HIGHSCORE:_TRUE'
  });
  expect(state).toBeTruthy();
});

it('should set state to false', () => {
  const state = isHighscoreReducer(true, {
    type: 'HIGHSCORE:_FALSE'
  });
  expect(state).toBeFalsy();
});