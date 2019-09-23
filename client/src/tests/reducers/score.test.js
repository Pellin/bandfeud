import scoreReducer from '../../reducers/score';

it('should default state to 0', () => {
  const state = scoreReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toBe(0);
});

it('should add to existing score', () => {
  const score = 20;
  const newScore = 13;

  const state = scoreReducer(score, {
    type: 'ADD_TO_SCORE',
    payload: newScore
  });
  expect(state).toBe(score + newScore);
});
