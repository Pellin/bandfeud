import usedReducer from '../../reducers/used';

it('should default state to empty array', () => {
  const state = usedReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('should add a string to used array', () => {
  const used = ['one', 'two', 'three'];
  const newBand = 'four';

  const state = usedReducer(used, {
    type: 'ADD_TO_USED',
    payload: newBand
  });
  expect(state).toEqual([...used, newBand]);
});

it('should reset used to empty array', () => {
  const used = ['one', 'two', 'three'];
  const state = usedReducer(used, {
    type: 'RESET_USED'
  });
  expect(state).toEqual([]);
});
