import highscoresReducer from '../../reducers/highscores';

it('should default state to empty array', () => {
  const state = highscoresReducer(undefined, {
    type: '@@INIT'
  });
});

it('should set highscores', () => {
  const highscores = [{name: 'Falle', score: 467, date: 1567360106355},{name: 'Tjalle', score: 324, date: 1567360120895}];
  const state = highscoresReducer([], {
    type: 'SET_HIGHSCORES',
    payload: highscores
  });
  expect(state).toEqual(highscores)
});
