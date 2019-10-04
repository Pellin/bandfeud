import showGameOver from '../../reducers/showGameOver';

it('should default state to false', () => {
  const state = showGameOver(undefined, {
    type: '@@INIT'
  });
  expect(state).toBe(false);
});

it('should set state to true', () => {
  const state = showGameOver(false, {
    type: 'SHOW_GAME_OVER'
  });
  expect(state).toBe(true);
});

it('should set state to false', () => {
  const state = showGameOver(true, {
    type: 'HIDE_GAME_OVER'
  });
  expect(state).toBe(false);
});