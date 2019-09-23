import difficultyReducer from '../../reducers/difficulty';

it('should default state to 20 seconds', () => {
  const state = difficultyReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual(20);
});

it('should set state to 20 seconds if value is lower than 20', () => {
  const state = difficultyReducer(20, {
    type: 'SET_DIFFICULTY',
    payload: 18
  });
  expect(state).toEqual(20);
});

it('should set state to 15 seconds if value is between 21 and 30', () => {
  const state = difficultyReducer(20, {
    type: 'SET_DIFFICULTY',
    payload: 26
  });
  expect(state).toEqual(15);
});

it('should set state to 10 seconds if value is between 31 and 50', () => {
  const state = difficultyReducer(15, {
    type: 'SET_DIFFICULTY',
    payload: 46
  });
  expect(state).toEqual(10);
});

it('should set state to 5 seconds if value is over 50', () => {
  const state = difficultyReducer(10, {
    type: 'SET_DIFFICULTY',
    payload: 51
  });
  expect(state).toEqual(5);
});

it('should reset state to 20 seconds', () => {
  const state = difficultyReducer(5, {
    type: 'RESET_DIFFICULTY'
  });
  expect(state).toEqual(20);
});
