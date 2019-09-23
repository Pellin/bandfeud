import currentPointsReducer from '../../reducers/currentPoints';

it('should default state to 0', () => {
  const state = currentPointsReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toBe(0);
});

it('should set current points', () => {
  const state = currentPointsReducer(23, {
    type: 'SET_CURRENT_POINTS',
    payload: 12
  });
  expect(state).toBe(12);
});
