import gameStatusReducer from '../../reducers/gameStatus';

it('should default state to false', () => {
  const state = gameStatusReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toBeFalsy();
});

it('should set state to true', () => {
  const state = gameStatusReducer(false, {
    type: 'GAME_ON'
  });
  expect(state).toBeTruthy();
});

it('should set state to false', () => {
  const state = gameStatusReducer(true, {
    type: 'GAME_OVER'
  });
  expect(state).toBeFalsy();
});
